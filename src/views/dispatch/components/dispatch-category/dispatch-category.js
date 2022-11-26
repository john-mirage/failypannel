import dispatchCategoryApi from "../../api/dispatch-category.api";

class DispatchCategory extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #textElement;
  #nameElement;
  #countElement;
  listElement;

  static get observedAttributes() {
    return ["data-category"];
  }

  constructor() {
    super();
    const templateContent = document.getElementById("template-dispatch-category").content;
    this.#textElement = templateContent.firstElementChild.cloneNode(true);
    this.listElement = templateContent.lastElementChild.cloneNode(true);
    this.#nameElement = this.#textElement.querySelector('[data-js="name"]');
    this.#countElement = this.#textElement.querySelector('[data-js="count"]');
  }

  get category() {
    return this.dataset.category;
  }

  set category(newCategory) {
    if (typeof newCategory === "string") {
      this.dataset.category = newCategory;
    } else {
      this.removeAttribute("data-category");
    }
  }

  updateCategoryName(categoryName) {
    if (typeof categoryName === "string") {
      if (this.#nameElement.textContent !== categoryName) {
        this.#nameElement.textContent = categoryName;
      }
    } else {
      throw new Error("The category name is not a string");
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
    if (typeof this.category === "string") {
      const category = dispatchCategoryApi.getCategoryById(this.category);
      this.updateCategoryName(category.name);
    } else {
      throw new Error("The category is not defined");
    }
  }

  clearCategory() {
    this.#nameElement.textContent = null;
    this.#countElement.textContent = null;
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchCategory");
      this.replaceChildren(this.#textElement, this.listElement);
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-category": {
        if (typeof newValue === "string") {
          this.updateCategory();
        } else {
          this.clearCategory();
        }
        break;
      }
    }
  }
}

export default DispatchCategory;
