const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Cleanup - delete in correct order to avoid foreign key constraints
    await prisma.bankTransaction.deleteMany();
    await prisma.emailReceipt.deleteMany();
    await prisma.ledgerEntry.deleteMany();
    await prisma.bankStatement.deleteMany();
    await prisma.emailConnection.deleteMany();
    await prisma.stripeConnection.deleteMany();
    await prisma.user.deleteMany();

    // Create user
    const user = await prisma.user.create({
        data: {
            email: "demo@example.com",
            name: "Demo User",
        },
    });

    // Email & Stripe connections
    await prisma.emailConnection.create({
        data: {
            userId: user.id,
            email: "demo@example.com",
            status: "connected",
        },
    });

    await prisma.stripeConnection.create({
        data: {
            userId: user.id,
            status: "connected",
        },
    });

    // Bank Statement + Transactions
    const statement = await prisma.bankStatement.create({
        data: {
            userId: user.id,
            name: "HDFC July Statement",
            uploadDate: new Date(),
            rows: 2,
            status: "processed",
        },
    });

    // Ledger Entries
    await prisma.ledgerEntry.createMany({
        data: [
            {
                userId: user.id,
                date: new Date("2024-07-01"),
                description: "Amazon Web Services - Hosting",
                amount: 1200.00,
                vendor: "Amazon",
                source: "email",
                status: "MATCHED",
                statementId: statement.id,
            },
            {
                userId: user.id,
                date: new Date("2024-07-03"),
                description: "Figma Subscription",
                amount: 350.00,
                vendor: "Figma",
                source: "manual",
                status: "UNMATCHED",
                statementId: statement.id,
            },
        ],
    });

    await prisma.bankTransaction.createMany({
        data: [
            {
                statementId: statement.id,
                date: new Date("2024-07-01"),
                description: "Amazon Web Services - Hosting",
                amount: 1200.00,
                balance: 8800.00,
                confidence: 95,
                source: "HDFC",
                matchedLedgerId: null,
            },
            {
                statementId: statement.id,
                date: new Date("2024-07-05"),
                description: "Internet Charges",
                amount: 999.00,
                balance: 7801.00,
                confidence: 80,
                source: "HDFC",
                matchedLedgerId: null,
            },
        ],
    });

    // Email Receipt
    await prisma.emailReceipt.create({
        data: {
            userId: user.id,
            subject: "Figma July Invoice",
            date: new Date("2024-07-03"),
            amount: 350.00,
            vendor: "Figma",
            status: "processed",
            confidence: 90,
        },
    });

    console.log("✅ Done seeding!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
