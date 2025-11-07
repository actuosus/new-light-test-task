import "dotenv/config";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { Elysia } from "elysia";
import { createTaskRoutes } from "../src/tasks/interface/http/routes";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

let app: any;
let server: any;
let baseUrl: string;

beforeAll(async () => {
  app = new Elysia().use(createTaskRoutes(prisma));
  server = app.listen(0);
  baseUrl = `http://${server.server.hostname}:${server.server.port}`;
});

afterAll(async () => {
  await prisma.task.deleteMany();
  server.stop();
  await prisma.$disconnect();
});

describe("Tasks API", () => {
  it("should create a new task", async () => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test task",
        description: "This is a test",
      }),
    });

    expect(response.status).toBe(201);
    const body = await response.json();

    expect(body).toHaveProperty("id");
    expect(body.title).toBe("Test task");
  });

  it("should list tasks", async () => {
    const res = await fetch(`${baseUrl}/tasks`);
    expect(res.status).toBe(200);

    const tasks = await res.json();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThanOrEqual(1);
  });

  it("should get a single task by id", async () => {
    const list = await fetch(`${baseUrl}/tasks`);
    const tasks = await list.json();
    const task = tasks[0];

    const res = await fetch(`${baseUrl}/tasks/${task.id}`);
    expect(res.status).toBe(200);
    const body = await res.json();

    expect(body.id).toBe(task.id);
    expect(body.title).toBe(task.title);
  });

  it("should update a task", async () => {
    const list = await fetch(`${baseUrl}/tasks`);
    const tasks = await list.json();
    const task = tasks[0];

    const res = await fetch(`${baseUrl}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Updated title" }),
    });

    expect(res.status).toBe(200);
    const updated = await res.json();
    expect(updated.title).toBe("Updated title");
  });

  it("should delete a task", async () => {
    const list = await fetch(`${baseUrl}/tasks`);
    const tasks = await list.json();
    const task = tasks[0];

    const res = await fetch(`${baseUrl}/tasks/${task.id}`, {
      method: "DELETE",
    });
    expect(res.status).toBe(204);
  });
});
