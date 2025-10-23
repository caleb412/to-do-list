import { AbstractComponent } from "../framework/view/abstract-component.js";

function createListComponentTemplate() {
  return `
          <ul class = "task-list">
          </ul>`;
}

export default class ListComponent extends AbstractComponent {
  constructor({ status, label, onTaskDrop, onTaskReorder }) {
    super();
    this.status = status;
    this.label = label;
    this.#setDropHandler(onTaskDrop);
    this.onTaskReorder = onTaskReorder;
  }
  get template() {
    return createListComponentTemplate(this.status, this.label);
  }
  #setDropHandler(onTaskDrop) {
    const container = this.element;

    container.addEventListener("dragover", (event) => {
      event.preventDefault();
      this.#handleDragOver(event);
    });
    container.addEventListener("drop", (event) => {
      event.preventDefault();
      this.#handleDrop(event, onTaskDrop);
    });
    container.addEventListener("dragenter", (event) => {
      event.preventDefault();
    });
  }
  #handleDragOver(event) {
    const afterElement = this.#getDragAfterElement(this.element, event.clientY);
    const draggingElement = document.querySelector(".task.dragging");

    if (afterElement) {
      afterElement.classList.add("drag-over-before");
    } else {
      const lastItem = this.element.querySelector(".task:last-child");
      if (lastItem) {
        lastItem.classList.add("drag-over-after");
      } else {
        this.element.classList.add("drag-over-empty");
      }
    }
  }

  #handleDrop(event, onTaskDrop) {
    const taskId = event.dataTransfer.getData("text/plain");
    const draggedElement = document.querySelector(`[data-task-id="${taskId}"]`);

    if (!draggedElement) return;

    const afterElement = this.#getDragAfterElement(this.element, event.clientY);
    const tasksInList = Array.from(this.element.querySelectorAll(".task"));

    if (afterElement) {
      this.element.insertBefore(draggedElement, afterElement);
    } else {
      this.element.appendChild(draggedElement);
    }

    const newTaskOrder = Array.from(this.element.querySelectorAll(".task")).map(
      (element) => element.getAttribute("data-task-id")
    );

    onTaskDrop(taskId, this.status);

    if (this.onTaskReorder) {
      this.onTaskReorder(newTaskOrder, this.status);
    }
  }

  #getDragAfterElement(container, y) {
    const draggableElements = Array.from(
      container.querySelectorAll(".task:not(.dragging)")
    );

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
