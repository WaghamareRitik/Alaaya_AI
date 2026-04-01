// src/test.ts

import { prisma } from "./config/prisma";

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
