import { AbstractComponent } from "../framework/view/abstract-component.js";

function createListComponentTemplate() {
  return `
          <ul class = "task-list">
          </ul>`;
}

export default class ListComponent extends AbstractComponent {
  getTemplate() {
    return createListComponentTemplate();
  }
}
