import dispatchCategoryAPI from "../../api/dispatch-category.api";
import dispatchGroupAPI from "../../api/dispatch-group.api";
import dispatchUnitAPI from "../../api/dispatch-unit.api";
import { groupIsValid } from "../../types/dispatch-group.type";
import { unitIsValid } from "../../types/dispatch-unit.type";

const WAITING_CATEGORY_ID = "2";

class DispatchGroup extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #headerElement;
  #nameElement;
  #numberElement;
  #listElement;
  #deleteButtonElement;
  #group;
  #units;
  #dispatchUnit = document.createElement("li", { is: "dispatch-unit" });

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-dispatch-group"
    ).content;
    this.#headerElement = templateContent.firstElementChild.cloneNode(true);
    this.#listElement = templateContent.lastElementChild.cloneNode(true);
    this.#nameElement = this.#headerElement.querySelector('[data-js="name"]');
    this.#numberElement =
      this.#headerElement.querySelector('[data-js="number"]');
    this.#deleteButtonElement = this.#headerElement.querySelector(
      '[data-js="delete-button"]'
    );
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
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

  get units() {
    if (this.#units) {
      return this.#units;
    } else {
      throw new Error("The units are not defined");
    }
  }

  set units(newUnits) {
    if (
      Array.isArray(newUnits) &&
      newUnits.every((newUnit) => unitIsValid(newUnit))
    ) {
      this.#units = newUnits;
      if (this.isConnected) {
        this.updateGroupName();
        this.updateGroupUnits();
        this.updateGroupNumber();
        this.handleListHeight();
      }
    } else {
      throw new Error("The new units are not valid");
    }
  }

  updateGroupName() {
    const category = dispatchCategoryAPI.getCategory(this.group.categoryId);
    if (this.#nameElement.textContent !== category.name) {
      this.#nameElement.textContent = category.name;
    }
  }

  updateGroupUnits() {
    const dispatchUnits = this.units.map((unit) => {
      const dispatchUnit = this.#dispatchUnit.cloneNode(true);
      dispatchUnit.unit = unit;
      return dispatchUnit;
    });
    this.#listElement.replaceChildren(...dispatchUnits);
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

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchGroup");
      this.replaceChildren(this.#headerElement, this.#listElement);
      this.#hasBeenMountedOnce = true;
    }
    this.updateGroup();
    this.#deleteButtonElement.addEventListener(
      "click",
      this.handleDeleteButtonClick
    );
  }

  disconnectedCallback() {
    this.#deleteButtonElement.removeEventListener(
      "click",
      this.handleDeleteButtonClick
    );
  }

  sendDispatchUpdateEvent() {
    const customEvent = new CustomEvent("dispatch-update", {
      bubbles: true,
    });
    this.dispatchEvent(customEvent);
  }

  handleDeleteButtonClick() {
    const webDispatchUnits = [...this.#listElement.children];
    if (webDispatchUnits.length > 0) {
      const lastIndex = dispatchCategoryAPI.getCategoryUnitLastIndex(WAITING_CATEGORY_ID);
      webDispatchUnits.forEach((webDispatchUnit, index) => {
        const newUnit = {
          ...webDispatchUnit.unit,
          parentType: "category",
          parentId: WAITING_CATEGORY_ID,
          parentOrderId: lastIndex + (index + 1),
        };
        webDispatchUnit.unit = newUnit;
        dispatchUnitAPI.updateUnit(newUnit);
      });
    }
    dispatchGroupAPI.deleteGroup(this.group.id);
    // ask the waiting category to update.
  }
}

export default DispatchGroup;
