// Simple test endpoint for debugging
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Backend is working!', 
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
    });
});

// Test database connection
app.get('/test-db', async (req, res) => {
    try {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        
        await prisma.$connect();
        const result = await prisma.$queryRaw`SELECT 1 as test`;
        await prisma.$disconnect();
        
        res.json({ 
            success: true, 
            result,
            database: 'connected'
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            database: 'failed'
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

export default app;
