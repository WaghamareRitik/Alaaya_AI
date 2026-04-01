import { PrismaClient } from "./generated";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const category = await prisma.category.create({
    data: {
      name: "Clothing",
    },
  });

  const product = await prisma.inventory.create({
    data: {
      skuCode: "SKU001",
      name: "T-Shirt",
      price: 999,
      categoryId: category.id,
    },
  });

  console.log(" Seeded:", product);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
