import dispatchApi from "../../../api/dispatch-api";
import Sortable from "sortablejs";

class WebDispatchGroup extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #nameElement;
  #placeholderElement;
  #sortable;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-group");
    this.#template = template.content.cloneNode(true);
    this.#nameElement = this.#template.querySelector('[data-js="name"]');
    this.#placeholderElement = this.#template.querySelector(
      '[data-js="placeholder"]'
    );
  }

  static get observedAttributes() {
    return ["data-category-id", "data-id", "data-name", "data-size"];
  }

  get categoryId() {
    return this.dataset.categoryId;
  }

  set categoryId(newCategoryId) {
    if (typeof newCategoryId === "string") {
      this.dataset.categoryId = newCategoryId;
    } else {
      this.removeAttribute("data-category-id");
    }
  }

  get id() {
    return this.dataset.id;
  }

  set id(newId) {
    if (typeof newId === "string") {
      this.dataset.id = newId;
    } else {
      this.removeAttribute("data-id");
    }
  }

  get name() {
    return this.dataset.name;
  }

  set name(newName) {
    if (typeof newName === "string") {
      this.dataset.name = newName;
    } else {
      this.removeAttribute("data-name");
    }
  }

  get size() {
    return this.dataset.size;
  }

  set size(newSize) {
    if (typeof newSize === "string") {
      this.dataset.size = newSize;
    } else {
      this.removeAttribute("data-size");
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webDispatchUnit");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
    this.upgradeProperty("id");
    this.upgradeProperty("categoryId");
    this.upgradeProperty("name");
    this.upgradeProperty("size");
    this.#sortable = new Sortable(this.#placeholderElement, {
      group: "unit",
    });
  }

  disconnectedCallback() {
    if (this.#sortable) {
      this.#sortable.destroy();
    }
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-id":
        this.handleUnits();
        break;
      case "data-name":
        this.#nameElement.textContent = newValue ?? "";
        break;
      case "data-size":
        this.handleUnits();
        break;
    }
  }

  getWebDispatchUnit(unit) {
    const webDispatchUnit = document.createElement("web-dispatch-unit");
    webDispatchUnit.categoryId = unit.categoryId;
    webDispatchUnit.groupId = unit.groupId;
    webDispatchUnit.id = unit.id;
    webDispatchUnit.number = unit.number;
    webDispatchUnit.name = unit.name;
    webDispatchUnit.role = unit.role;
    return webDispatchUnit;
  }

  handleUnits() {
    if (this.id && this.size) {
      const units = dispatchApi.getGroupUnits(this.id);
      if (units.length > 0) {
        const webDispatchUnits = units.map((unit) => {
          const listItemElement = document.createElement("li");
          listItemElement.append(this.getWebDispatchUnit(unit));
          return listItemElement;
        });
        this.#placeholderElement.replaceChildren(...webDispatchUnits);
      }
    }
  }
}

export default WebDispatchGroup;
