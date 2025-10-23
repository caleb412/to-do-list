import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";
export default class TasksModel {
  #boardtasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter((task) => task.status === status);
  }

  addTask(title) {
    const newTask = {
      title,
      status: "backlog",
      id: generateID(),
    };
    this.#boardtasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }
  removeTasksByStatus(status) {
    this.#boardtasks = this.#boardtasks.filter(
      (task) => task.status !== status
    );
    this._notifyObservers();
  }
  addObserver(observer) {
    this.#observers.push(observer);
  }
  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }
  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
  updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find((task) => task.id === taskId);
    if (task) {
      task.status = newStatus;
      this._notifyObservers();
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
    this._notifyObservers();
  }
}
