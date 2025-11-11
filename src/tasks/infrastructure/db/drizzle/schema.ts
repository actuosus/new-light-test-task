import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const taskStatus = pgEnum("status", [
  "pending",
  "in_progress",
  "completed",
]);

export const tasks = pgTable("Task", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  status: taskStatus("status").notNull().default("pending"),
  dueDate: timestamp("dueDate"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
