import React from "react";
import { TodoService } from "services/todo.service";
import { TodoStore } from "store/todo.store";

interface IStoreContext {
  todoStore: TodoStore;
}

/**
 *  Создание стора и его сервиса
 */
const todoService = new TodoService();
const todoStore = new TodoStore(todoService);

export const StoreContext = React.createContext<IStoreContext>({
  todoStore,
});
