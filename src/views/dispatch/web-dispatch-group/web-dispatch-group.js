import dispatchApi from "../../../api/dispatch-api";
import { groupIsValid } from "../../../helpers/type-checkers";

class WebDispatchGroup extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #template;
  #nameElement;
  #numberElement;
  #listElement;
  #deleteButtonElement;
  #webDispatchUnit = document.createElement("li", { is: "web-dispatch-unit" });
  #group;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-group");
    this.#template = template.content.firstElementChild.cloneNode(true);
    this.#nameElement = this.#template.querySelector('[data-js="name"]');
    this.#numberElement = this.#template.querySelector('[data-js="number"]');
    this.#listElement = this.#template.querySelector('[data-js="list"]');
    this.#deleteButtonElement = this.#template.querySelector(
      '[data-js="delete-button"]'
    );
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  get group() {
    if (this.#group) {
      return this.#group;
    } else {
      throw new Error("The group is not defined");
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
    const category = dispatchApi.getCategoryById(this.group.categoryId);
    if (this.#nameElement.textContent !== category.name) {
      this.#nameElement.textContent = category.name;
    }
  }

  updateGroupUnits() {
    const units = dispatchApi.getGroupUnits(this.group.id);
    const webDispatchUnits = units.map((unit) => {
      const webDispatchUnit = this.#webDispatchUnit.cloneNode(true);
      webDispatchUnit.unit = unit;
      return webDispatchUnit;
    });
    this.#listElement.replaceChildren(...webDispatchUnits);
  }

  updateGroupNumber() {
    const firstUnitNumber = this.#listElement.firstElementChild?.unit.number;
    if (firstUnitNumber) {
      if (this.#numberElement.textContent !== firstUnitNumber) {
        this.#numberElement.textContent = firstUnitNumber;
      }
    } else if (this.#numberElement.textContent !== null) {
      this.#numberElement.textContent = null;
    }
  }

  handleListHeight() {
    const style = getComputedStyle(this.#listElement);
    const gapProperty = style.getPropertyValue("--_list-gap");
    const paddingProperty = style.getPropertyValue("--_list-padding");
    const listItemHeightProperty = style.getPropertyValue(
      "--_list-item-height"
    );
    const gapNumber = String(this.group.size - 1);
    this.#listElement.style.setProperty(
      "--_list-height",
      `calc((${gapProperty} * ${gapNumber}) + (${paddingProperty} * 2) + (${listItemHeightProperty} * ${String(
        this.group.size
      )}))`
    );
  }

  updateGroup() {
    this.updateGroupName();
    this.updateGroupUnits();
    this.updateGroupNumber();
    this.handleListHeight();
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webDispatchGroup");
      this.append(this.#template);
      this.upgradeProperty("group");
      this.#hasBeenMountedOnce = true;
    }
    this.updateGroup();
    this.#deleteButtonElement.addEventListener(
      "click",
      this.handleDeleteButtonClick
    );
    this.#listElement.addEventListener("dragover", this.handleDragOver);
    this.#listElement.addEventListener("drop", this.handleDrop);
  }

  disconnectedCallback() {
    this.#deleteButtonElement.removeEventListener(
      "click",
      this.handleDeleteButtonClick
    );
    this.#listElement.removeEventListener("dragover", this.handleDragOver);
    this.#listElement.removeEventListener("drop", this.handleDrop);
  }

  sendDispatchUpdateEvent() {
    const customEvent = new CustomEvent("dispatch-update", {
      bubbles: true,
    });
    this.dispatchEvent(customEvent);
  }

  handleDeleteButtonClick() {
    const webDispatchUnits = this.#listElement.children;
    if (webDispatchUnits.length > 0) {
      for (const webDispatchUnit of webDispatchUnits) {
        const newUnit = {
          ...webDispatchUnit.unit,
          parentType: "category",
          parentId: "2",
          parentOrderId: 0,
        };
        webDispatchUnit.unit = newUnit;
        dispatchApi.updateUnit(newUnit);
      }
    }
    dispatchApi.deleteGroup(this.group.id);
    this.sendDispatchUpdateEvent();
  }

  sendDispatchUpdateEvent() {
    const customEvent = new CustomEvent("dispatch-update", {
      bubbles: true,
    });
    this.dispatchEvent(customEvent);
  }

  handleDragOver(event) {
    const hasDataType = event.dataTransfer.types.includes(
      "failyv/dispatch-unit"
    );
    const numberOfUnits = this.#listElement.children.length;
    const hasAvailableSpots = this.group.size - numberOfUnits > 0;
    if (hasDataType && hasAvailableSpots) {
      event.preventDefault();
      console.log("drop is allowed");
    } else {
      console.log("drop is NOT allowed");
    }
  }

  handleDrop(event) {
    event.preventDefault();
    const unitJSON = event.dataTransfer.getData("failyv/dispatch-unit");
    const unit = JSON.parse(unitJSON);
    console.log("dropped successfully");
    dispatchApi.updateUnit({
      ...unit,
      parentType: "group",
      parentId: this.group.id,
      parentOrderId: 0,
    });
    this.sendDispatchUpdateEvent();
  }
}

export default WebDispatchGroup;
