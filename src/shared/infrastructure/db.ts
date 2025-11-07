import { PrismaClient } from "../../generated/prisma/client";

export const prisma = new PrismaClient(); //.$extends(withAccelerate());

export default prisma;
