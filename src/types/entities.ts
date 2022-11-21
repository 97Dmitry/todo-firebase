import { Timestamp } from "firebase/firestore/lite";

export interface TodoEntity {
  id: string;
  text: string;
  description?: string;
  created: Timestamp;
  completionDate?: Timestamp;
  completed: boolean;
  filePath?: string;
  fileName?: string;
}
