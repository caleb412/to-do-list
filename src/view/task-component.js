import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskComponentTemplate(task) {
  const { title } = task;
  return `
   <li class="task">${title}</li>
  `;
}

export default class TaskComponent extends AbstractComponent {
  constructor({ task }) {
    this.task = task;
  }
  getTemplate() {
    return createTaskComponentTemplate(this.task);
  }
}
