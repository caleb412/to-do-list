import HeaderComponent from "./view/header-component.js";
import FormComponent from "./view/form-component.js";
import TaskboardComponent from "./view/taskboard-component.js";
import ColumnComponent from "./view/column-component.js";
import ListComponent from "./view/list-component.js";
import TaskComponent from "./view/task-component.js";
import { render, RenderPosition } from "../src/framework/render.js";

const bodyContainer = document.querySelector(".title-section");
const formContainer = document.querySelector(".form-section");
const taskBoardContainer = document.querySelector(".taskboard-section");

const taskBoardComponent = new TaskboardComponent();

const columnContainer = taskBoardComponent.getElement();

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormComponent(), formContainer, RenderPosition.AFTERBEGIN);
render(taskBoardComponent, taskBoardContainer, RenderPosition.AFTERBEGIN);

for (let i = 0; i < 4; i++) {
  const columnComponent = new ColumnComponent();
  const listComponent = new ListComponent();

  render(columnComponent, columnContainer);
  render(listComponent, columnComponent.getElement());

  const taskContainer = listComponent.getElement();

  for (let j = 0; j < 4; j++) {
    const taskComponent = new TaskComponent();
    render(taskComponent, taskContainer);
  }
}
