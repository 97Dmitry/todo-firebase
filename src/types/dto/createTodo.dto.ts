export interface CreateTodoDto {
  text: string;
  description?: string;
  completionDate?: Date;
  file?: ArrayBuffer;
  fileName?: string;
}
