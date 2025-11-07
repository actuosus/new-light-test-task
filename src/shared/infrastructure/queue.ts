import Queue from "bull";
import { env } from "prisma/config";

export const createQueue = (name: string) => new Queue(name, env("REDIS_URL"));
