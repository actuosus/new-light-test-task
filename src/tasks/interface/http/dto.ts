import { t } from "elysia";
import { Task } from "../../domain/Task";

export namespace TaskModel {
  enum TaskStatus {
    pending = "pending",
    in_progress = "in_progress",
    completed = "completed",
  }

  export const createTaskBody = t.Object({
    title: t.String(),
    description: t.Optional(t.String()),
    dueDate: t.Optional(t.Date()),
  });

  export type createTaskBody = typeof createTaskBody.static;

  export const getAllParams = t.Object({
    status: t.Optional(t.Enum(TaskStatus)),
  });

  export type getAllParams = typeof getAllParams.static;

  export const getParams = t.Object({
    id: t.String({
      format: "uuid",
    }),
  });

  export type getParams = typeof getParams.static;

  export const updateParams = t.Object({
    id: t.String({
      format: "uuid",
    }),
  });

  export type updateParams = typeof updateParams.static;

  export const updateTaskBody = t.Object({
    title: t.String(),
    description: t.Optional(t.String()),
    status: t.Optional(t.Enum(TaskStatus)),
    dueDate: t.Optional(t.Date()),
  });

  export type updateTaskBody = typeof updateTaskBody.static;

  export const deleteParams = t.Object({
    id: t.String({
      format: "uuid",
    }),
  });

  export type deleteParams = typeof deleteParams.static;

  export const toTaskDto = (task: Task) => ({
    id: task.id,
    title: task.title,
    description: task.description ?? null,
    status: task.status,
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  });

  export const toTaskListDto = (tasks: Task[]) => tasks.map(toTaskDto);
}
