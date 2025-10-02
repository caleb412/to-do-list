import { AbstractComponent } from "./view/abstract-component";

const RenderPosition = {
  BEFOREBEGIN: "beforebegin",
  AFTERBEGIN: "afterbegin",
  BEFOREEND: "beforeend",
  AFTEREND: "afterend",
};

function createElement(template) {
  const newElement = document.createElement("div");
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!(component instanceof AbstractComponent)) {
    throw new Error("Can render only components");
  }
  if (container === null) {
    throw new Error("Container element does not exist");
  }
  container.insertAdjacentElement(place, component.getElement());
}

export { RenderPosition, createElement, render };
