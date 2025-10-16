import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFormComponentTemplate() {
  return ` <form class="add_task_form">
        <label for="task_input"><h2>Новая задача</h2></label>
        <input
          type="textbox"
          id="task_input"
          placeholder="Название задачи..."
        />
        <button type="submit" class="submit_btn">+ Добавить</button>
      </form>`;
}

export default class FormComponent extends AbstractComponent {
  #handleClick = null;
  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener("submit", this.#clickHandler);
  }
  get template() {
    return createFormComponentTemplate();
  }
  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
    // console.log("Clicked");
  };
}
