import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyTaskComponentTemplate() {
  return `
            <li class="empty-task">Перетащите карточку</li>`;
}

export default class EmptyTaskComponent extends AbstractComponent {
  get template() {
    return createEmptyTaskComponentTemplate();
  }
}
