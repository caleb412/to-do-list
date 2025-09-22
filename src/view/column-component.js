import { createElement } from "../framework/render.js";

function createColumnComponentTemplate() {
  return `<div class="column backlog">
          <h3>Бэклог</h3>        
        </div>`;
}

export default class ColumnComponent {
  getTemplate() {
    return createColumnComponentTemplate();
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
