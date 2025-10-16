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
    return createListComponentTemplate();
  }
  #setDropHandler(onTaskDrop) {
    const container = this.element;

    container.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
  }
}
