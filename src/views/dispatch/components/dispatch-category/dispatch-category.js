import dispatchCategoryAPI from "../../api/dispatch-category.api";
import { categoryIsValid } from "../../types/dispatch-category.type";

class DispatchCategory extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #textElement;
  #listElement;
  #nameElement;
  #countElement;
  #category;
  #dispatchUnit = document.createElement("li", { is: "dispatch-unit" });
  #dispatchGroup = document.createElement("li", { is: "dispatch-group" });

  constructor() {
    super();
    const templateContent = document.getElementById("template-dispatch-category").content;
    this.#textElement = templateContent.firstElementChild.cloneNode(true);
    this.#listElement = templateContent.lastElementChild.cloneNode(true);
    this.#nameElement = this.#textElement.querySelector('[data-js="name"]');
    this.#countElement = this.#textElement.querySelector('[data-js="count"]');
  }

  get category() {
    if (this.#category) {
      return this.#category;
    } else {
      throw new Error("The category is not defined");
    }
  }

  set category(newCategory) {
    if (categoryIsValid(newCategory)) {
      this.#category = newCategory;
      if (this.isConnected) {
        this.updateCategory();
      }
    } else {
      throw new Error("The new category is not valid");
    }
  }

  updateCategoryName() {
    const currentCategoryName = this.category.name;
    if (this.#nameElement.textContent !== currentCategoryName) {
      this.#nameElement.textContent = currentCategoryName;
    }
  }

  updateCategoryCount() {
    const count = this.#listElement.children.length;
    const formatedCount = count > 0 ? ` (${String(count)})` : null;
    if (this.#countElement.textContent !== formatedCount) {
      this.#countElement.textContent = formatedCount;
    }
  }

  updateCategoryUnits() {
    const units = dispatchCategoryAPI.getCategoryUnits(this.category.id);
    const webDispatchUnits = units.map((unit) => {
      const webDispatchUnit = this.#dispatchUnit.cloneNode(true);
      webDispatchUnit.unit = unit;
      return webDispatchUnit;
    });
    this.#listElement.replaceChildren(...webDispatchUnits);
  }

  updateCategoryGroups() {
    const groups = dispatchCategoryAPI.getCategoryGroups(this.category.id);
    const webDispatchGroups = groups.map((group) => {
      const webDispatchGroup = this.#dispatchGroup.cloneNode(true);
      webDispatchGroup.group = group;
      return webDispatchGroup;
    });
    this.#listElement.replaceChildren(...webDispatchGroups);
  }

  updateCategory() {
    this.updateCategoryName();
    switch (this.category.type) {
      case "unit": {
        this.updateCategoryUnits();
        break;
      }
      case "group": {
        this.updateCategoryGroups();
        break;
      }
      default: {
        throw new Error("The category type is not valid");
      }
    }
    this.updateCategoryCount();
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchCategory");
      this.replaceChildren(this.#textElement, this.#listElement);
      this.#hasBeenMountedOnce = true;
    }
    this.updateCategory();
  }
}

export default DispatchCategory;
