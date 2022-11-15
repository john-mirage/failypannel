import dispatchApi from "../../../api/dispatch-api";
import Sortable from "sortablejs";

class WebDispatchCategory extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #nameElement;
  #countElement;
  #listElement;
  #sortable;

  static get observedAttributes() {
    return ["data-id", "data-type", "data-name", "data-count"];
  }

  get id() {
    return this.dataset.id;
  }

  set id(id) {
    if (typeof id === "string") {
      this.dataset.id = id;
    } else {
      this.removeAttribute("data-id");
    }
  }

  get type() {
    return this.dataset.type;
  }

  set type(newType) {
    if (typeof newType === "string") {
      this.dataset.type = newType;
    } else {
      this.removeAttribute("data-type");
    }
  }

  get name() {
    return this.dataset.label;
  }

  set name(newName) {
    if (typeof newName === "string") {
      this.dataset.name = newName;
    } else {
      this.removeAttribute("data-name");
    }
  }

  get count() {
    return this.dataset.count;
  }

  set count(newCount) {
    if (typeof newCount === "string") {
      this.dataset.count = newCount;
    } else {
      this.removeAttribute("data-count");
    }
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-category");
    this.#template = template.content.cloneNode(true);
    this.#nameElement = this.#template.querySelector('[data-js="name"]');
    this.#countElement = this.#template.querySelector('[data-js="count"]');
    this.#listElement = this.#template.querySelector('[data-js="list"]');
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webDispatchCategory");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
    this.upgradeProperty("id");
    this.upgradeProperty("type");
    this.upgradeProperty("name");
    this.#sortable = new Sortable(this.#listElement, {
      group: this.type,
    });
  }

  disconnectedCallback() {
    if (this.#sortable) {
      this.#sortable.destroy();
      console.log(this.#sortable);
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
        this.handleCategoryCards();
        break;
      case "data-type":
        this.handleCategoryCards();
        break;
      case "data-name":
        this.#nameElement.textContent = newValue ?? "";
        break;
      case "data-count":
        this.#countElement.textContent = ` (${newValue})` ?? "";
        break;
    }
  }

  getWebDispatchGroup(group) {
    const webDispatchGroup = document.createElement("web-dispatch-group");
    webDispatchGroup.categoryId = group.categoryId;
    webDispatchGroup.id = group.id;
    webDispatchGroup.name = group.name;
    webDispatchGroup.size = group.size;
    return webDispatchGroup;
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

  handleCategoryCards() {
    if (this.id && this.type) {
      switch (this.type) {
        case "group": {
          const groups = dispatchApi.getCategoryGroups(this.id);
          const webDispatchGroups = groups.map((group) => {
            const listItemElement = document.createElement("li");
            listItemElement.replaceChildren(this.getWebDispatchGroup(group));
            return listItemElement;
          });
          this.#listElement.replaceChildren(...webDispatchGroups);
          break;
        }
        case "unit": {
          const units = dispatchApi.getCategoryUnits(this.id);
          const webDispatchUnits = units.map((unit) => {
            const listItemElement = document.createElement("li");
            listItemElement.replaceChildren(this.getWebDispatchUnit(unit));
            return listItemElement;
          });
          this.#listElement.replaceChildren(...webDispatchUnits);
          break;
        }
        default:
          throw new Error("The category type is not valid");
      }
      this.count = String(this.#listElement.children.length);
    }
  }
}

export default WebDispatchCategory;
