import DispatchUnit from "../dispatch-unit";
import { groupIsValid } from "../../types/dispatch-group.type";
import { unitsAreTheSame } from "../../types/dispatch-unit.type";

class DispatchGroup extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #headerElement;
  #nameElement;
  #numberElement;
  #listElement;
  #deleteButtonElement;
  #categoryName;
  #group;

  constructor() {
    super();
    const templateContent = document.getElementById("template-dispatch-group").content;
    this.#headerElement = templateContent.firstElementChild.cloneNode(true);
    this.#listElement = templateContent.lastElementChild.cloneNode(true);
    this.#nameElement = this.#headerElement.querySelector('[data-js="name"]');
    this.#numberElement = this.#headerElement.querySelector('[data-js="number"]');
    this.#deleteButtonElement = this.#headerElement.querySelector('[data-js="delete-button"]');
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }

  get categoryName() {
    if (typeof this.#categoryName === "string") {
      return this.#categoryName;
    } else {
      throw new Error("The category name is not valid");
    }
  }

  set categoryName(newCategoryName) {
    if (typeof newCategoryName === "string") {
      this.#categoryName = newCategoryName;
      this.updateDispatchGroupName();
    } else {
      throw new Error("The category name is not valid");
    }
  }

  get group() {
    if (groupIsValid(this.#group)) {
      return this.#group;
    } else {
      throw new Error("The group is not valid");
    }
  }

  set group(newGroup) {
    if (groupIsValid(newGroup)) {
      this.#group = newGroup;
      this.updateDispatchGroupListHeight();
    } else {
      throw new Error("The new group is not valid");
    }
  }

  get dispatchUnits() {
    const dispatchUnits = [...this.#listElement.children];
    if (dispatchUnits.every((dispatchUnit) => dispatchUnit instanceof DispatchUnit)) {
      return dispatchUnits;
    } else {
      throw new Error("The dispatch units are not valid");
    }
  }

  set dispatchUnits(newDispatchUnits) {
    if (
      Array.isArray(newDispatchUnits) &&
      newDispatchUnits.every((newDispatchUnit) => newDispatchUnit instanceof DispatchUnit)
    ) {
      this.#listElement.replaceChildren(...newDispatchUnits);
      this.updateDispatchGroupNumber();
    } else {
      throw new Error("The new dispatch units are not valid");
    }
  }

  updateDispatchGroupName() {
    if (this.#nameElement.textContent !== this.categoryName) {
      this.#nameElement.textContent = this.categoryName;
    }
  }

  updateDispatchGroupListHeight() {
    if (this.group.size) {
      const gridTemplateRows = `repeat(${this.group.size}, 72px)`;
      this.#listElement.style.gridTemplateRows = gridTemplateRows;
    } else {
      throw new Error("The group size is not defined");
    }
  }

  updateDispatchGroupNumber() {
    const dispatchUnits = this.dispatchUnits;
    if (dispatchUnits.length > 0) {
      if (this.#numberElement.textContent !== dispatchUnits[0].unit.number) {
        this.#numberElement.textContent = dispatchUnits[0].unit.number;
      }
    } else if (this.#numberElement.textContent !== null) {
      this.#numberElement.textContent = null;
    }
  }

  reorderDispatchUnits() {
    const dispatchUnits = this.dispatchUnits;
    if (dispatchUnits.length > 0) {
      dispatchUnits.forEach((dispatchUnit, dispatchUnitIndex) => {
        const newUnit = {
          ...dispatchUnit.unit,
          parentType: "group",
          parentId: this.group.id,
          parentOrderId: dispatchUnitIndex,
        };
        if (!unitsAreTheSame(dispatchUnit.unit, newUnit)) {
          dispatchUnit.unit = newUnit;
        }
      });
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchGroup");
      this.replaceChildren(this.#headerElement, this.#listElement);
      this.#hasBeenMountedOnce = true;
    }
    this.#deleteButtonElement.addEventListener("click", this.handleDeleteButtonClick);
  }

  disconnectedCallback() {
    this.#deleteButtonElement.removeEventListener("click", this.handleDeleteButtonClick);
  }

  handleDeleteButtonClick() {
    const customEvent = new CustomEvent("dispatch-delete-group", {
      bubbles: true,
      detail: { dispatchGroup: this }
    });
    this.dispatchEvent(customEvent);
  }
}

export default DispatchGroup;
