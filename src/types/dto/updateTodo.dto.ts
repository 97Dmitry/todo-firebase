export interface UpdateTodoDto {
  id: string;
  text?: string;
  description?: string;
  completionDate?: Date;
  file?: ArrayBuffer;
  fileName?: string;
  completed?: boolean;
}
