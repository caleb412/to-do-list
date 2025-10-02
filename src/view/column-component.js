import { createElement } from "../framework/render.js";
function createColumnComponentTemplate(status, statusLabel) {
  return `<div class="column ${status}">
          <h3>${statusLabel}</h3>        
        </div>`;
}

export default class ColumnComponent {
  #status = null;
  #statusLabel = null;
  #element = null;

  constructor(status, statusLabel) {
    this.#status = status;
    this.#statusLabel = statusLabel;
  }
  getTemplate() {
    return createColumnComponentTemplate(this.#status, this.#statusLabel);
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
