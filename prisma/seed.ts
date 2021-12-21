import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const seed = async () => {
  // Create initial user
  await db.user.create({
    data: {
      email: process.env.DB_USER_EMAIL,
      passwordHash: process.env.DB_USER_HASH,
    },
  });
};

seed();
