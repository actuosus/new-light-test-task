import Bull from "bull";
import type { TaskId, TaskStatus } from "../../domain/Task";
import type { TaskRepository } from "../../domain/TaskRepository";

export class UpdateTask {
  constructor(
    private readonly repo: TaskRepository,
    private readonly dueDateQueue: Bull.Queue
  ) {}

  async execute(input: {
    id: TaskId;
    title?: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: Date | null;
  }) {
    const task = await this.repo.findById(input.id);
    if (!task) throw new Error("Task not found");

    task.update({
      title: input.title,
      description: input.description,
      status: input.status,
      dueDate: input.dueDate,
    });

    await this.repo.save(task);
    this.dueDateQueue.add(task);

    return task;
  }
}
