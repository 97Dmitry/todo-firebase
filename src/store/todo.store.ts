import { makeAutoObservable, runInAction, toJS } from "mobx";
import { TodoService } from "services/todo.service";
import { errorHandler } from "utils/errorHandler";
import { CreateTodoDto } from "types/dto/createTodo.dto";
import { TodoEntity } from "types/entities";
import { UpdateTodoDto } from "../types/dto/updateTodo.dto";

export class TodoStore {
  constructor(private readonly todoService: TodoService) {
    makeAutoObservable(this);
  }

  private _todos: Array<TodoEntity> = [];
  private _todo: TodoEntity | undefined = undefined;
  private _isLoading = false;

  /**
   *  Геттер задач
   */
  get todos() {
    return toJS(this._todos);
  }

  /**
   *  Получение задачи для страницы подробной информации о задаче
   */
  get currentTodo() {
    return toJS(this._todo);
  }

  get isLoading() {
    return this._isLoading;
  }

  /**
   *  Экшен получения задачи
   *  @param {string} id - ID задачи.
   */
  getTodoById = async (id: string) => {
    runInAction(() => (this._isLoading = true));

    try {
      const todo = await this.todoService.getTodoById(id);
      todo && runInAction(() => (this._todo = todo));
    } catch (error) {
      errorHandler(error);
    } finally {
      runInAction(() => (this._isLoading = false));
    }
  };

  /**
   *  Экшен получения всех задач
   */
  getTodos = async () => {
    runInAction(() => (this._isLoading = true));

    try {
      const todos = await this.todoService.getAllTodos();
      todos && runInAction(() => (this._todos = todos));
    } catch (error) {
      errorHandler(error);
    } finally {
      runInAction(() => (this._isLoading = false));
    }
  };

  /**
   *  Экшен создания задачи
   *  @param {Object} data - Данные создания задачи.
   */
  createTodo = async (data: CreateTodoDto) => {
    runInAction(() => (this._isLoading = true));

    try {
      const todo = await this.todoService.createTodo(data);
      todo && runInAction(() => this._todos.push(todo));
    } catch (error) {
      errorHandler(error);
    } finally {
      runInAction(() => (this._isLoading = false));
    }
  };

  /**
   *  Экшен обновления задачи
   *  @param {Object} data - Данные обновления задачи.
   */
  updateTdoById = async (data: UpdateTodoDto) => {
    runInAction(() => (this._isLoading = true));

    try {
      const updated = await this.todoService.updateTodoById(data);
      runInAction(() => {
        const index = this._todos.findIndex((todo) => todo.id === updated.id);
        const todo = this._todos.find((todo) => todo.id === updated.id);
        if (todo) this._todos[index] = { ...todo, ...updated.updatedFields };
      });
    } catch (error) {
      errorHandler(error);
    } finally {
      runInAction(() => (this._isLoading = false));
    }
  };

  /**
   *  Экшен удаления задачи
   *  @param {string} id - ID задачи.
   */
  deleteTodo = async (id: string) => {
    runInAction(() => (this._isLoading = true));

    try {
      await this.todoService.deleteTodo(id);
      runInAction(() => (this._todos = this._todos.filter((todo) => todo.id !== id)));
    } catch (error) {
      errorHandler(error);
    } finally {
      runInAction(() => (this._isLoading = false));
    }
  };

  getTodoFile = async (link: string) => {
    try {
      return await this.todoService.downloadTodoFile(link);
    } catch (error) {
      errorHandler(error);
    }
  };
}
