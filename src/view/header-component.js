import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHeaderComponentTemplate() {
  return `<header>
            <h1 class="page_title">Список задач</h1>
        </header>`;
}

export default class HeaderComponent extends AbstractComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
  }
}
