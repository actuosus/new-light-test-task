import type { PrismaClient } from "@prisma/client";
import { Elysia } from "elysia";
import { TaskModel } from "./dto";
import { createTaskPlugin } from "./taskPlugin";

const INSTANCE_NAME = "task-routes";
const TASKS_PREFIX = "/tasks";

export const createTaskRoutes = (db: PrismaClient) => {
  return (
    new Elysia({
      name: INSTANCE_NAME,
      prefix: TASKS_PREFIX,
    })
      .use(createTaskPlugin(db))
      // List
      .get(
        "/",
        async ({ taskUseCases, query }) => {
          const tasks = await taskUseCases.list.execute(query);
          return TaskModel.toTaskListDto(tasks);
        },
        { query: TaskModel.getAllParams }
      )

      // Get by id
      .get(
        "/:id",
        async ({ taskUseCases, params, set }) => {
          try {
            const task = await taskUseCases.get.execute(params.id);
            return TaskModel.toTaskDto(task);
          } catch {
            set.status = 404;
            return { message: "Task not found" };
          }
        },
        { params: TaskModel.getParams }
      )

      // Create
      .post(
        "/",
        async ({ body, taskUseCases, set }) => {
          const id = crypto.randomUUID();
          const dueDate = body.dueDate ? new Date(body.dueDate) : null;

          const task = await taskUseCases.create.execute({
            id,
            title: body.title,
            description: body.description,
            dueDate,
          });

          set.status = 201;
          return TaskModel.toTaskDto(task);
        },
        { body: TaskModel.createTaskBody }
      )

      // Update
      .put(
        "/:id",
        async ({ body, params, taskUseCases, set }) => {
          try {
            const dueDate =
              body.dueDate === undefined
                ? undefined
                : body.dueDate
                ? new Date(body.dueDate)
                : null;

            const task = await taskUseCases.update.execute({
              id: params.id,
              title: body.title,
              description: body.description,
              status: body.status,
              dueDate,
            });

            return TaskModel.toTaskDto(task);
          } catch {
            set.status = 404;
            return { message: "Task not found" };
          }
        },
        {
          params: TaskModel.updateParams,
          body: TaskModel.updateTaskBody,
        }
      )

      // Delete
      .delete(
        "/:id",
        async ({ params, taskUseCases, set }) => {
          await taskUseCases.delete.execute(params.id);
          set.status = 204;
        },
        { params: TaskModel.deleteParams }
      )
  );
};
