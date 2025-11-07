import type { Task, TaskId, TaskStatus } from "./Task";

export interface TaskRepository {
  findById(id: TaskId): Promise<Task | null>;
  findAll({ status }: { status?: TaskStatus }): Promise<Task[]>;
  save(task: Task): Promise<void>; // create or update
  delete(id: TaskId): Promise<void>;
}
