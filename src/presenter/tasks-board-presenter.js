import TaskboardComponent from "../view/taskboard-component.js";
import ColumnComponent from "../view/column-component.js";
import ListComponent from "../view/list-component.js";
import TaskComponent from "../view/task-component.js";
import { Status, StatusLabel } from "../const.js";
import { render } from "../framework/render.js";
import ButtonComponent from "../view/button-component.js";
import EmptyTaskComponent from "../view/empty-task-component.js";
import { UserAction } from "../const.js";
export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  #tasksBoardComponent = new TaskboardComponent();

  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }
  get tasks() {
    return this.#tasksModel.tasks;
  }

  async init() {
    await this.#tasksModel.init();
    this.#clearBoard();
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderBoard();

    const statusValues = Object.values(Status);

    this.#renderTaskList(statusValues);
  }
  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }
  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
  }

  #renderTaskList(statusValues) {
    statusValues.forEach((status) => {
      const columnComponent = new ColumnComponent(status, StatusLabel[status]);
      const listComponent = new ListComponent({
        status: status,
        label: StatusLabel[status],
        onTaskDrop: this.#handleTaskDrop.bind(this),
        onTaskReorder: this.#handleTaskReorder.bind(this),
      });

      render(columnComponent, this.#tasksBoardComponent.element);
      render(listComponent, columnComponent.element);
      if (status === Status.BASKET) {
        this.#renderClearButton(columnComponent.element);
      }

      const tasksWithStatus = this.#tasksModel.getTasksByStatus(status);

      if (tasksWithStatus.length === 0) {
        this.#renderEmptyTaskComponent(listComponent.element);
      } else {
        tasksWithStatus.forEach((task) => {
          this.#renderTask(task, listComponent.element);
        });
      }
    });
  }
  #renderClearButton(container) {
    const clearButtonComponent = new ButtonComponent({
      onClick: this.#handleClearBinClick.bind(this),
    });
    render(clearButtonComponent, container);
    clearButtonComponent.setClickHandler(this.#handleClearBinClick.bind(this));
  }
  #renderEmptyTaskComponent(container) {
    const emptyTaskComponent = new EmptyTaskComponent();
    render(emptyTaskComponent, container);
  }
  createTask() {
    const taskTitle = document.querySelector("#task_input").value.trim();
    if (!taskTitle) {
      return;
    }
    this.#tasksModel.addTask(taskTitle);
    document.querySelector("#task_input").value = "";
  }
  #clearBin() {
    const basketTasks = this.tasks.filter(
      (task) => task.status === Status.BASKET
    );
    if (basketTasks.length === 0) {
      return;
    }
    this.#tasksModel.removeTasksByStatus(Status.BASKET);
  }
  #handleClearBinClick() {
    this.#clearBin();
  }
  #updateClearButton() {
    const basketTasks = this.tasks.filter(
      (task) => task.status === Status.BASKET
    );
    const clearButtons = document.querySelectorAll(".clear_btn");

    clearButtons.forEach((button) => {
      if (basketTasks.length === 0) {
        button.disabled = true;
        button.classList.add("clear_btn--disabled");
      } else {
        button.disabled = false;
        button.classList.remove("clear_btn--disabled");
      }
    });
  }

  #handleModelChange(event, payload) {
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.init();
        this.#updateClearButton();
        break;
    }
  }
  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = "";
  }
  #handleTaskDrop(taskId, newStatus) {
    this.#tasksModel.updateTaskStatus(taskId, newStatus);
  }
  #handleTaskReorder(taskOrder, status) {
    this.#tasksModel.reorderTasks(taskOrder, status);
  }
}
