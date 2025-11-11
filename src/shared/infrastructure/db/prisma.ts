import { PrismaClient } from "../../../generated/prisma/client";

export const db = new PrismaClient();

export default db;
