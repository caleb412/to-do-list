import { AbstractComponent } from "../framework/view/abstract-component.js";

function createListComponentTemplate() {
  return `
          <ul class = "task-list">
          </ul>`;
}

export default class ListComponent extends AbstractComponent {
  constructor({ status, label, onTaskDrop }) {
    super();
    this.status = status;
    this.label = label;
    this.#setDropHandler(onTaskDrop);
  }
  get template() {
    return createListComponentTemplate(this.status, this.label);
  }
  #setDropHandler(onTaskDrop) {
    const container = this.element;

    container.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    container.addEventListener("drop", (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");
      onTaskDrop(taskId, this.status);
    });
  }
}
