import { AbstractComponent } from "../framework/view/abstract-component";

function createColumnComponentTemplate(status, statusLabel) {
  return `<div class="column ${status}">
          <h3>${statusLabel}</h3>        
        </div>`;
}

export default class ColumnComponent extends AbstractComponent {
  #status = null;
  #statusLabel = null;

  constructor(status, statusLabel) {
    this.#status = status;
    this.#statusLabel = statusLabel;
  }
  getTemplate() {
    return createColumnComponentTemplate(this.#status, this.#statusLabel);
  }
}
