import DispatchCategoryAPI from "../../api/dispatch-category.api";
import DispatchUnitAPI from "../../api/dispatch-unit.api";
import { groupIsValid } from "../../types/dispatch-group.type";

class DispatchGroup extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #headerElement;
  #nameElement;
  #numberElement;
  #listElement;
  #deleteButtonElement;
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
      if (this.isConnected) {
        this.updateGroup();
      }
    } else {
      throw new Error("The new group is not valid");
    }
  }

  updateGroupName() {
    const dispatchCategory = DispatchCategoryAPI.getDispatchCategoryById(this.group.categoryId);
    if (this.#nameElement.textContent !== dispatchCategory.category.name) {
      this.#nameElement.textContent = dispatchCategory.category.name;
    }
  }

  updateGroupUnits() {
    this.#listElement.replaceChildren(
      ...DispatchUnitAPI.getDispatchUnitsByGroupId(this.group.id)
    );
  }

  updateGroupNumber() {
    const firstUnit = this.#listElement.firstElementChild;
    if (firstUnit) {
      if (this.#numberElement.textContent !== firstUnit.unit.number) {
        this.#numberElement.textContent = firstUnit.unit.number;
      }
    } else if (this.#numberElement.textContent !== null) {
      this.#numberElement.textContent = null;
    }
  }

  updateGroup() {
    this.updateGroupName();
    this.updateGroupUnits();
    this.updateGroupNumber();
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchGroup");
      this.replaceChildren(this.#headerElement, this.#listElement);
      this.#hasBeenMountedOnce = true;
    }
    this.updateGroup();
    this.#deleteButtonElement.addEventListener("click", this.handleDeleteButtonClick);
  }

  disconnectedCallback() {
    this.#deleteButtonElement.removeEventListener("click", this.handleDeleteButtonClick);
  }

  handleDeleteButtonClick() {
    const customEvent = new CustomEvent("dispatch-delete-group", {
      bubbles: true,
      detail: { groupId: this.group.id }
    });
    this.dispatchEvent(customEvent);
  }
}

export default DispatchGroup;
