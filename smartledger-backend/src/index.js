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

// === Setup ===
const app = express();
const prisma = new PrismaClient();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

// === tRPC ===
app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: () => ({}),
    })
);

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

                fs.unlinkSync(file.path);

                res.status(200).json({ message: "CSV uploaded and inserted", count: entries.length });
            } catch (error) {
                console.error("DB Error:", error);
                fs.unlinkSync(file.path);
                res.status(500).json({ error: "Failed to insert ledger entries" });
            }
        })
        .on("error", (error) => {
            console.error("CSV parse error:", error);
            res.status(500).json({ error: "Failed to parse CSV" });
        });
});

// === Start Server ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
