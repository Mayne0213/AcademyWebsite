import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = 
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL + "?connection_limit=5&pool_timeout=20"
      }
    }
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;