import dispatchCategoryAPI from "../../api/dispatch-category.api";
import dispatchGroupAPI from "../../api/dispatch-group.api";
import dispatchUnitApi from "../../api/dispatch-unit.api";

const WAITING_CATEGORY_ID = "2";

class DispatchGroup extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #headerElement;
  #nameElement;
  #numberElement;
  #listElement;
  #deleteButtonElement;
  #dispatchUnit = document.createElement("li", { is: "dispatch-unit" });

  static get observedAttributes() {
    return ["data-group"];
  }

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
    return this.dataset.group;
  }

  set group(newGroup) {
    if (typeof newGroup === "string") {
      this.dataset.group = newGroup;
    } else {
      this.removeAttribute("data-group");
    }
  }

  updateGroupName() {
    if (typeof this.group === "string") {
      const group = dispatchGroupAPI.getGroupById(this.group);
      const category = dispatchCategoryAPI.getCategoryById(group.categoryId);
      if (this.#nameElement.textContent !== category.name) {
        this.#nameElement.textContent = category.name;
      }
    } else {
      throw new Error("The group is not defined");
    }
  }

  updateGroupUnits() {
    if (typeof this.group === "string") {
      const units = dispatchUnitApi.getUnitsByGroupId(this.group);
      const dispatchUnits = units.map((unit) => {
        const dispatchUnit = this.#dispatchUnit.cloneNode(true);
        dispatchUnit.dataset.unit = unit.id;
        return dispatchUnit;
      });
      this.#listElement.replaceChildren(...dispatchUnits);
    } else {
      throw new Error("The group is not defined");
    }
  }

  updateGroupNumber() {
    const firstUnit = this.#listElement.firstElementChild;
    if (firstUnit) {
      const unit = dispatchUnitApi.getUnitById(firstUnit.unit);
      if (this.#numberElement.textContent !== unit.number) {
        this.#numberElement.textContent = unit.number;
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

  clearGroup() {
    this.#nameElement.textContent = null;
    this.#listElement.replaceChildren();
    this.updateGroupNumber();
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

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-group": {
        if (typeof newValue === "string") {
          this.updateGroup();
        } else {
          this.clearGroup();
        }
        break;
      }
    }
  }

  handleDeleteButtonClick() {
    if (typeof this.group === "string") {
      const group = dispatchGroupAPI.getGroupById(this.group);
      const fromCategory = document.querySelector(`li[data-category="${group.categoryId}"]`);
      const toCategory = document.querySelector(`li[data-category="${WAITING_CATEGORY_ID}"]`);
      const dispatchUnits = [...this.#listElement.children];
      if (dispatchUnits.length > 0) {
        toCategory.listElement.append(...dispatchUnits);
        toCategory.reorderCategoryUnits();
      }
      dispatchGroupAPI.deleteGroup(this.group);
      this.remove();
      fromCategory.reorderCategoryGroups();
    } else {
      throw new Error("The group is not defined");
    }
  }
}

export default DispatchGroup;
