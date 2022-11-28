import { categoryIsValid } from "../../types/dispatch-category.type";

class DispatchCategory extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #textElement;
  #nameElement;
  #countElement;
  listElement;
  #category;

  constructor() {
    super();
    const templateContent = document.getElementById("template-dispatch-category").content;
    this.#textElement = templateContent.firstElementChild.cloneNode(true);
    this.listElement = templateContent.lastElementChild.cloneNode(true);
    this.#nameElement = this.#textElement.querySelector('[data-js="name"]');
    this.#countElement = this.#textElement.querySelector('[data-js="count"]');
  }

  get category() {
    if (categoryIsValid(this.#category)) {
      return this.#category;
    } else {
      throw new Error("The category is not valid");
    }
  }

  set category(newCategory) {
    if (categoryIsValid(newCategory)) {
      this.#category = newCategory;
      this.updateDispatchCategory();
    } else {
      throw new Error("The new category is not valid");
    }
  }

  updateDispatchCategoryName() {
    if (this.#nameElement.textContent !== this.category.name) {
      this.#nameElement.textContent = this.category.name;
    }
  }

  updateDispatchCategoryCount() {
    const count = this.listElement.children.length;
    const formatedCount = count > 0 ? ` (${String(count)})` : null;
    if (this.#countElement.textContent !== formatedCount) {
      this.#countElement.textContent = formatedCount;
    }
  }

  updateDispatchCategory() {
    this.updateDispatchCategoryName(this.category.name);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchCategory");
      this.replaceChildren(this.#textElement, this.listElement);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default DispatchCategory;
