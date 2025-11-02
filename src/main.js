import HeaderComponent from "./view/header-component.js";
import FormComponent from "./view/form-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";

import { render, RenderPosition } from "../src/framework/render.js";
import TasksModel from "./model/task-model.js";
import TaskApiService from "./task-api-service.js";

const END_POINT = "https://68f9e86bef8b2e621e7df808.mockapi.io/";

const bodyContainer = document.querySelector(".title-section");
const formContainer = document.querySelector(".form-section");
const taskBoardContainer = document.querySelector(".taskboard-section");

const formComponent = new FormComponent({ onClick: handleNewTaskButtonClick });

function handleNewTaskButtonClick() {
  taskBoardPresenter.createTask();
}
const tasksModel = new TasksModel({
  taskApiService: new TaskApiService(END_POINT),
});
const taskBoardPresenter = new TasksBoardPresenter({
  boardContainer: taskBoardContainer,
  tasksModel,
});
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(formComponent, formContainer, RenderPosition.AFTERBEGIN);

taskBoardPresenter.init();
