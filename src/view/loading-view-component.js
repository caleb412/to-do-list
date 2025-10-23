import { AbstractComponent } from "../framework/view/abstract-component";

function createNoTaskTemplate() {
  return `<p class="board__no-tasks>
            Loading...
        </p>`;
}

export default class LoadingViewComponent extends AbstractComponent {
  get template() {
    return createNoTaskTemplate();
  }
}
