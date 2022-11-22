import { categoryIsValid } from "../../../helpers/type-checkers";

class DispatchCategory extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #textElement;
  #nameElement;
  #countElement;
  #category;

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-dispatch-category"
    ).content;
    this.#textElement = templateContent.firstElementChild.cloneNode(true);
    this.listElement = templateContent.lastElementChild.cloneNode(true);
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
    const count = this.listElement.children.length;
    const formatedCount = count > 0 ? ` (${String(count)})` : null;
    if (this.#countElement.textContent !== formatedCount) {
      this.#countElement.textContent = formatedCount;
    }
  }

  updateCategory() {
    this.updateCategoryName();
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchCategory");
      this.replaceChildren(this.#textElement, this.listElement);
      this.#hasBeenMountedOnce = true;
    }
    this.updateCategory();
  }
}

export default DispatchCategory;
