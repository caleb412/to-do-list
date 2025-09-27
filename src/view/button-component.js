import { createElement } from "../framework/render.js";

function createButtonComponentTemplate() {
  return `<button class="clear_btn">🗙 Очистить</button>`;
}

export default class ButtonComponent {
  getTemplate() {
    return createButtonComponentTemplate();
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
