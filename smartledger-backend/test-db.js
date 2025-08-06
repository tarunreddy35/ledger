import { PrismaClient } from '@prisma/client';

async function testConnection() {
    const prisma = new PrismaClient();
    
    try {
        await prisma.$connect();
        console.log('✅ Database connection successful');
        
        // Try to get database info
        const result = await prisma.$queryRaw`SELECT 1 as test`;
        console.log('Database query result:', result);
        
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
