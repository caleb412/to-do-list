import { AbstractComponent } from "../framework/view/abstract-component.js";

function createButtonComponentTemplate() {
  return `<button class="clear_btn">🗙 Очистить</button>`;
}

export default class ButtonComponent extends AbstractComponent {
  #handleClick = null;
  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener(this.#clickHandler);
  }
  get template() {
    return createButtonComponentTemplate();
  }
  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
