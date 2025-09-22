import { createElement } from "../framework/render.js";

function createTaskboardComponentTemplate() {
  return `<div class ="taskboard">
  </div>`;
}

export default class TaskboardComponent {
  getTemplate() {
    return createTaskboardComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
