import { AbstractComponent } from "../framework/view/abstract-component.js";

function createButtonComponentTemplate() {
  return `<button class="clear_btn">🗙 Очистить</button>`;
}

export default class ButtonComponent extends AbstractComponent {
  getTemplate() {
    return createButtonComponentTemplate();
  }
}
