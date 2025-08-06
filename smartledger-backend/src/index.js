// server.js

import express from "express";
import cors from "cors";
import multer from "multer";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router/index.js"; // adjust path if needed
import pkg, { Prisma } from '@prisma/client';
import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { PrismaClient } from "@prisma/client";

// Check for required environment variables
if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL environment variable is required');
    throw new Error('DATABASE_URL environment variable is required');
}

// === Setup ===
const app = express();

// Initialize Prisma client with proper configuration for serverless
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

const upload = multer({ dest: "/tmp/" }); // Use /tmp for serverless

app.use(cors());
app.use(express.json());

// === Health Check ===
app.get("/", (req, res) => {
    res.json({ 
        message: "Smart Ledger Backend API", 
        status: "running",
        timestamp: new Date().toISOString(),
        env: {
            node_env: process.env.NODE_ENV,
            has_database_url: !!process.env.DATABASE_URL
        }
    });
});

app.get("/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// === tRPC ===
try {
    app.use(
        "/trpc",
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext: () => ({}),
        })
    );
} catch (error) {
    console.error("Failed to setup tRPC middleware:", error);
    throw error;
}

// === CSV Upload ===
app.post("/api/upload-csv", upload.single("file"), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const results = [];

    fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", (data) => {
            console.log(data); // Check what keys and values you get here
            results.push(data);
        })
        .on("end", async () => {
            try {
                const userId = "some-user-id";          // Replace with real user context
                const statementId = "some-statement-id"; // Provide actual statement ID

                const entries = results.map((row) => ({
                    userId,
                    statementId,
                    date: new Date(row.date.split("-").reverse().join("-")), // convert DD-MM-YYYY to YYYY-MM-DD
                    description: row.description,
                    amount: new Prisma.Decimal(row.amount),
                    vendor: row.description,  // Using description as vendor
                    source: "csv",
                }));

                // Bulk insert entries
                await prisma.ledgerEntry.createMany({
                    data: entries,
                });

                // Clean up file - handle potential errors
                try {
                    fs.unlinkSync(file.path);
                } catch (unlinkError) {
                    console.warn("Could not delete temporary file:", unlinkError.message);
                }

                res.status(200).json({ message: "CSV uploaded and inserted", count: entries.length });
            } catch (error) {
                console.error("DB Error:", error);
                // Clean up file even on error
                try {
                    fs.unlinkSync(file.path);
                } catch (unlinkError) {
                    console.warn("Could not delete temporary file:", unlinkError.message);
                }
                res.status(500).json({ error: "Failed to insert ledger entries", details: error.message });
            }
        })
        .on("error", (error) => {
            console.error("CSV parse error:", error);
            res.status(500).json({ error: "Failed to parse CSV" });
        });
});

// === Export for Vercel ===
export default app;
