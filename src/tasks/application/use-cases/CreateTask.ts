import Bull from "bull";
import { Task } from "../../domain/Task";
import type { TaskRepository } from "../../domain/TaskRepository";

export class CreateTask {
  constructor(
    private readonly repo: TaskRepository,
    private readonly dueDateQueue: Bull.Queue
  ) {}

  async execute(input: {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date | null;
  }) {
    const task = Task.create(input);

    await this.repo.save(task);

    if (
      task.dueDate &&
      task.dueDate.getTime() - Date.now() < 24 * 60 * 60 * 1000
    ) {
      this.dueDateQueue.add(task);
    }

    return task;
  }
}
