import { type TaskStatus } from "../../domain/Task";
import type { TaskRepository } from "../../domain/TaskRepository";

export class ListTasks {
  constructor(private readonly repo: TaskRepository) {}

  async execute({ status }: { status?: TaskStatus } = {}) {
    return this.repo.findAll({ status });
  }
}
