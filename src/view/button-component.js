import { AbstractComponent } from "../framework/view/abstract-component.js";

function createButtonComponentTemplate() {
  return `<button class="clear_btn">🗙 Очистить</button>`;
}

export default class ButtonComponent extends AbstractComponent {
  constructor({ onClick }) {
    super();
    this._onClick = onClick;
  }
  get template() {
    return createButtonComponentTemplate();
  }
  setClickHandler(callback) {
    this._onClick = callback;
    this.element.addEventListener("click", this._onClick);
  }
}
