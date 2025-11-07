import type { PrismaClient } from "@prisma/client";
import { Elysia } from "elysia";
import { logger } from "../../../shared/infrastructure/logging/logger";
import { createQueue } from "../../../shared/infrastructure/queue";
import { CreateTask } from "../../application/use-cases/CreateTask";
import { DeleteTask } from "../../application/use-cases/DeleteTask";
import { GetTask } from "../../application/use-cases/GetTask";
import { ListTasks } from "../../application/use-cases/ListTasks";
import { UpdateTask } from "../../application/use-cases/UpdateTask";
import { PrismaTaskRepository } from "../../infrastructure/repositories/PrismaTaskRepository";

const TASK_DUE_DATE_QUEUE_NAME = "task-due-date-queue";

const createTaskUseCases = (db: PrismaClient) => {
  const repo = new PrismaTaskRepository(db);
  const dueDateQueue = createQueue(TASK_DUE_DATE_QUEUE_NAME);

  dueDateQueue.process(async (job) => {
    logger.info(`notification:send:${TASK_DUE_DATE_QUEUE_NAME}`, job.data);

    return Promise.resolve();
  });

  return {
    create: new CreateTask(repo, dueDateQueue),
    get: new GetTask(repo),
    list: new ListTasks(repo),
    update: new UpdateTask(repo, dueDateQueue),
    delete: new DeleteTask(repo),
  };
};

export const createTaskPlugin = (db: PrismaClient) => {
  const taskUseCases = createTaskUseCases(db);

  return new Elysia({
    name: "task-plugin",
    seed: "tasks",
  }).decorate("taskUseCases", taskUseCases);
};

export type TaskUseCases = ReturnType<typeof createTaskUseCases>;
