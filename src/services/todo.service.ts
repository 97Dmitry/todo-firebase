import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { CreateTodoDto } from "types/dto/createTodo.dto";
import { TodoEntity } from "../types/entities";
import { UpdateTodoDto } from "../types/dto/updateTodo.dto";
import { objectPayloadValue } from "../utils/objectPayloadValue";

export class TodoService {
  /**
   * Получение одной задачи по ID
   * @param {string} id - ID задачи.
   */
  async getTodoById(id: string): Promise<TodoEntity> {
    const todoRef = doc(db, "todo", id);
    const querySnapshot = await getDoc(todoRef);
    return querySnapshot.data() as TodoEntity;
  }

  /**
   * Получение всех задач
   */
  async getAllTodos(): Promise<Array<TodoEntity>> {
    const q = query(collection(db, "todo"), orderBy("created", "desc"));
    const querySnapshot = await getDocs(q);
    const todos = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return todos as Array<TodoEntity>;
  }

  /**
   *  Создание задачи
   *  @param {Object} payload - Данные создания задачи.
   */
  async createTodo(payload: CreateTodoDto): Promise<TodoEntity | undefined> {
    const data = {
      text: payload.text,
      created: Timestamp.now(),
      completed: false,
      description: payload.description,
      completionDate: payload.completionDate
        ? Timestamp.fromDate(payload.completionDate)
        : undefined,
      file: payload.file,
      fileName: payload.fileName,
    };

    const fixedData = objectPayloadValue(data, "file");
    const reference = await addDoc(collection(db, "todo"), fixedData);
    if (reference.id) {
      if (payload.file) {
        const todoFilesRef = await ref(storage, `todo-files/${reference.id}`);
        const fileUrl = await uploadBytes(todoFilesRef, payload.file);
        const todo = { id: reference.id, filePath: fileUrl.metadata.fullPath, ...fixedData };
        const createdTodoDocRef = doc(db, "todo", reference.id);
        await updateDoc(createdTodoDocRef, {
          filePath: fileUrl.metadata.fullPath,
        });
        return todo;
      } else return { id: reference.id, ...fixedData };
    }
  }

  /**
   *  Обновление задачи
   *  @param {Object} payload - Данные обновления задачи.
   */
  async updateTodoById(payload: UpdateTodoDto) {
    const todoRef = await doc(db, "todo", payload.id);
    const data = objectPayloadValue(payload, ["id", "file"]);
    if (payload.file) {
      const todo = await getDoc(todoRef);
      if (todo && todo.data()?.filePath) {
        const prevFileRef = ref(storage, todo.data()?.filePath);
        uploadBytes(prevFileRef, payload.file);
      }
    }
    await updateDoc(todoRef, { ...data });
    const updatedTodo = <any>{ ...data };
    if (data?.completionDate) updatedTodo.completionDate = Timestamp.fromDate(data.completionDate);
    return { updatedFields: updatedTodo, id: payload.id };
  }

  /**
   *  Удаление задачи
   *  @param {string} id - ID удаляемой задачи.
   */
  async deleteTodo(id: string) {
    const target = doc(db, "todo", id);
    await deleteDoc(target);
  }

  /**
   *  Загрузка файла задачи
   *  @param {string} link - Ссылка на файл.
   */
  async downloadTodoFile(link: string) {
    const pathReference = ref(storage, link);
    const result = await getDownloadURL(pathReference);
    return result;
  }
}
