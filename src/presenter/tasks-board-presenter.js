import TaskboardComponent from "../view/taskboard-component.js";
import ColumnComponent from "../view/column-component.js";
import ListComponent from "../view/list-component.js";
import TaskComponent from "../view/task-component.js";
import { Status, StatusLabel } from "../const.js";
import { render } from "../framework/render.js";
import ButtonComponent from "../view/button-component.js";
import EmptyTaskComponent from "../view/empty-task-component.js";
import LoadingViewComponent from "../view/loading-view-component.js";
import { UserAction } from "../const.js";
export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #resetButtonComponent = new ButtonComponent({
    onClick: this.#handleClearBinClick.bind(this),
  });

  #tasksBoardComponent = new TaskboardComponent();
  #loadingComponent = new LoadingViewComponent();

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
    this.#renderLoading();
    await this.#tasksModel.init();
    this.#removeLoading();
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
    render(this.#resetButtonComponent, container);
    this.#resetButtonComponent.setClickHandler(
      this.#handleClearBinClick.bind(this)
    );
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

  async #handleClearBinClick() {
    try {
      await this.#tasksModel.clearBasketTasks();
    } catch (err) {
      console.error("Ошибка при отчистке корзины:", err);
    }
  }
  #updateClearButton() {
    const clearButton = document.querySelector(".clear_btn");

    if (this.#tasksModel.hasBasketTasks()) {
      clearButton.disabled = false;
      clearButton.classList.remove("clear_btn--disabled");
    } else {
      clearButton.disabled = true;
      clearButton.classList.add("clear_btn--disabled");
    }
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
  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer);
  }

  #removeLoading() {
    if (
      this.#loadingComponent.element &&
      this.#loadingComponent.element.parentNode
    ) {
      this.#loadingComponent.element.remove();
      this.#loadingComponent.removeElement();
    }
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = "";
  }
  async #handleTaskDrop(taskId, newStatus) {
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus);
    } catch (err) {
      console.error("Ошибка при обновлении статуса задачи:", er);
    }
  }
  #handleTaskReorder(taskOrder, status) {
    this.#tasksModel.reorderTasks(taskOrder, status);
  }
}
