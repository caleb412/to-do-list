import TaskboardComponent from "../view/taskboard-component.js";
import ColumnComponent from "../view/column-component.js";
import ListComponent from "../view/list-component.js";
import TaskComponent from "../view/task-component.js";
import { Status, StatusLabel } from "../const.js";
import { render } from "../framework/render.js";
import ButtonComponent from "../view/button-component.js";
import EmptyTaskComponent from "../view/empty-task-component.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  #tasksBoardComponent = new TaskboardComponent();

  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    render(this.#tasksBoardComponent, this.#boardContainer);

    const statusValues = Object.values(Status);

    statusValues.forEach((status) => {
      const columnComponent = new ColumnComponent(status, StatusLabel[status]);
      const listComponent = new ListComponent();

      render(columnComponent, this.#tasksBoardComponent.element);
      render(listComponent, columnComponent.element);

      if (status === Status.BASKET) {
        const clearButtonComponent = new ButtonComponent();
        render(clearButtonComponent, columnComponent.element);
      }

      const tasksWithStatus = this.#boardTasks.filter(
        (task) => task.status === status
      );
      tasksWithStatus.forEach((task) => {
        this.#renderTask(task, listComponent.element);
      });
    });
  }
  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }
}
