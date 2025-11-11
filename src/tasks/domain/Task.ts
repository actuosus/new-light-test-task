export type TaskId = string;

export type TaskStatus = "pending" | "in_progress" | "completed";

export interface TaskProps {
  id: TaskId;
  title: string;
  description?: string | null;
  status: TaskStatus;
  dueDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Task implements TaskProps {
  id!: TaskId;
  title!: string;
  description?: string | null;
  status!: TaskStatus;
  dueDate?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;

  private constructor(props: TaskProps) {
    Object.assign(this, props);
  }

  static create(params: {
    id: TaskId;
    title: string;
    description?: string;
    dueDate?: Date | null;
  }): Task {
    const now = new Date();

    return new Task({
      id: params.id,
      title: params.title.trim(),
      description: params.description,
      status: "pending",
      dueDate: params.dueDate ?? null,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: TaskProps): Task {
    return new Task(props);
  }

  update(props: Partial<Omit<TaskProps, "id" | "createdAt">>): void {
    if (props.title !== undefined) this.title = props.title.trim();
    if (props.description !== undefined) this.description = props.description;
    if (props.status !== undefined) this.status = props.status;
    if (props.dueDate !== undefined) this.dueDate = props.dueDate;
    this.updatedAt = new Date();
  }
}
