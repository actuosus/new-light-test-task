import type { TaskId } from "../../domain/Task";
import type { TaskRepository } from "../../domain/TaskRepository";

export class DeleteTask {
  constructor(private readonly repo: TaskRepository) {}

  async execute(id: TaskId) {
    return await this.repo.delete(id);
  }
}
