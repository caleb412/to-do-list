import Observable from "../framework/observable.js";
import { UpdateType, UserAction } from "../const.js";
import { generateID } from "../utils.js";

export default class TasksModel extends Observable {
  #taskApiService = null;
  #boardtasks = [];

  constructor({ taskApiService }) {
    super();
    this.#taskApiService = taskApiService;
    this.#taskApiService.tasks.then((tasks) => {
      console.log(tasks);
    });
  }

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter((task) => task.status === status);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: "backlog",
      id: generateID(),
    };
    try {
      const createdTask = await this.#taskApiService.addTask(newTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error("Ошибка при добавлении задачи на сервер:", err);
      throw err;
    }
  }
  removeTasksByStatus(status) {
    this.#boardtasks = this.#boardtasks.filter(
      (task) => task.status !== status
    );
    this._notify(UpdateType.MAJOR);
  }

  updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find((task) => task.id === taskId);
    if (task) {
      task.status = newStatus;
      this._notify(UpdateType.INIT);
    }
  }
  reorderTasks(taskIds, status) {
    const taskIdSet = new Set(taskIds);

    const reorderedTasks = [];
    const otherTasks = [];

    this.#boardtasks.forEach((task) => {
      if (taskIdSet.has(task.id)) {
        task.status = status;
        reorderedTasks.push(task);
      } else if (task.status !== status) {
        otherTasks.push(task);
      }
    });

    const finalReordered = taskIds
      .map((id) => reorderedTasks.find((task) => task.id === id))
      .filter((task) => task);

    this.#boardtasks = [...otherTasks, ...finalReordered];
    this._notify(UpdateType.INIT);
  }
  async init() {
    try {
      const tasks = await this.#taskApiService.tasks;
      this.#boardtasks = tasks;
    } catch (err) {
      this.#boardtasks;
    }
    this._notify(UpdateType.INIT);
  }
}
