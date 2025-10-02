import HeaderComponent from "./view/header-component.js";
import FormComponent from "./view/form-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";

import { render, RenderPosition } from "../src/framework/render.js";
import TasksModel from "./model/task-model.js";

const bodyContainer = document.querySelector(".title-section");
const formContainer = document.querySelector(".form-section");
const taskBoardContainer = document.querySelector(".taskboard-section");

const tasksModel = new TasksModel();
const taskBoardPresenter = new TasksBoardPresenter({
  boardContainer: taskBoardContainer,
  tasksModel,
});
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormComponent(), formContainer, RenderPosition.AFTERBEGIN);

taskBoardPresenter.init();
