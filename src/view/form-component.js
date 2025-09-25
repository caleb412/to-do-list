import { createElement } from "../framework/render.js";

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

export default class FormComponent {
  getTemplate() {
    return createFormComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
