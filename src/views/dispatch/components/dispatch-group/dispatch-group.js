import DispatchCategoryAPI from "../../api/dispatch-category.api";
import { groupIsValid } from "../../types/dispatch-group.type";
import DispatchUnit from "../dispatch-unit";

class DispatchGroup extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #headerElement;
  #nameElement;
  #numberElement;
  #listElement;
  #deleteButtonElement;
  #group;
  #dispatchUnits;

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
      this.updateDispatchGroup();
    } else {
      throw new Error("The new group is not valid");
    }
  }

  get dispatchUnits() {
    if (
      Array.isArray(this.#dispatchUnits) &&
      this.#dispatchUnits.every((dispatchUnit) => dispatchUnit instanceof DispatchUnit)
    ) {
      return this.#dispatchUnits;
    } else {
      throw new Error("The dispatch units are not valid");
    }
  }

  set dispatchUnits(newDispatchUnits) {
    if (
      Array.isArray(newDispatchUnits) &&
      newDispatchUnits.every((newDispatchUnit) => newDispatchUnit instanceof DispatchUnit)
    ) {
      this.#dispatchUnits = newDispatchUnits;
      this.updateDispatchGroupUnits();
    } else {
      throw new Error("The new dispatch units are not valid");
    }
  }

  updateDispatchGroupName() {
    const dispatchCategory = DispatchCategoryAPI.getDispatchCategoryById(this.group.categoryId);
    if (this.#nameElement.textContent !== dispatchCategory.category.name) {
      this.#nameElement.textContent = dispatchCategory.category.name;
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
    const firstUnit = this.#listElement.firstElementChild;
    if (firstUnit) {
      if (this.#numberElement.textContent !== firstUnit.unit.number) {
        this.#numberElement.textContent = firstUnit.unit.number;
      }
    } else if (this.#numberElement.textContent !== null) {
      this.#numberElement.textContent = null;
    }
  }

  updateDispatchGroup() {
    //this.updateDispatchGroupName();
    this.updateDispatchGroupListHeight();
  }

  updateDispatchGroupUnits() {
    this.#listElement.replaceChildren(...this.#dispatchUnits);
    this.updateDispatchGroupNumber();
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
