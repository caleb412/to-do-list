import { AbstractComponent } from "../framework/view/abstract-component.js";

function createColumnComponentTemplate(status, statusLabel) {
  return `<div class="column ${status}">
          <h3>${statusLabel}</h3>        
        </div>`;
}

export default class ColumnComponent extends AbstractComponent {
  #status = null;
  #statusLabel = null;

  constructor(status, statusLabel) {
    super();
    this.#status = status;
    this.#statusLabel = statusLabel;
  }
  get template() {
    return createColumnComponentTemplate(this.#status, this.#statusLabel);
  }
}
