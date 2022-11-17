import dispatchApi from "../../../api/dispatch-api";
import Sortable from "sortablejs";

class WebDispatchGroup extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #categoryElement;
  #numberElement;
  #listElement;
  #listItemElement = document.createElement("li");
  #webDispatchUnit = document.createElement("web-dispatch-unit");
  #sortableInstance;

  static get observedAttributes() {
    return ["data-id", "data-number"];
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-group");
    this.#template = template.content.firstElementChild.cloneNode(true);
    this.#categoryElement = this.#template.querySelector(
      '[data-js="category"]'
    );
    this.#numberElement = this.#template.querySelector('[data-js="number"]');
    this.#listElement = this.#template.querySelector('[data-js="list"]');
    this.#sortableInstance = new Sortable(this.#listElement, {
      group: "unit",
      onSort: () => {
        this.handleGroupNumber();
        this.handleSortableFeature();
      },
    });
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

  get number() {
    return this.dataset.number;
  }

  set number(newNumber) {
    if (typeof newNumber === "string") {
      this.dataset.number = newNumber;
    } else {
      this.removeAttribute("data-number");
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webDispatchGroup");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
    this.upgradeProperty("id");
    this.upgradeProperty("number");
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  getWebDispatchUnit(unitId) {
    if (typeof unitId === "string") {
      const webDispatchUnit = this.#webDispatchUnit.cloneNode(true);
      webDispatchUnit.id = unitId;
      return webDispatchUnit;
    } else {
      throw new Error("The unit id is not a string");
    }
  }

  handleGroupNumber() {
    const firstUnit = this.#listElement.querySelector("web-dispatch-unit");
    if (firstUnit) {
      this.number = dispatchApi.getUnitById(firstUnit.id).number;
    } else {
      this.number = undefined;
    }
  }

  handleDispatchUnits(unitId) {
    if (typeof unitId === "string") {
      const units = dispatchApi.getGroupUnits(unitId);
      if (units.length > 0) {
        const webDispatchUnits = units.map((unit) => {
          const listItemElement = this.#listItemElement.cloneNode(true);
          listItemElement.replaceChildren(this.getWebDispatchUnit(unit.id));
          return listItemElement;
        });
        this.#listElement.replaceChildren(...webDispatchUnits);
      }
      this.handleGroupNumber();
    } else {
      throw new Error("The unit id is not a string");
    }
  }

  handleSortableFeature() {
    const group = dispatchApi.getGroupById(this.id);
    const isSortable = group.size > this.#listElement.children.length;
    if (isSortable) {
      this.#sortableInstance.option("group", { name: "unit", put: true });
    } else {
      this.#sortableInstance.option("group", { name: "unit", put: false });
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-id": {
        if (typeof newValue === "string") {
          const group = dispatchApi.getGroupById(newValue);
          const category = dispatchApi.getCategoryById(group.categoryId);
          this.#categoryElement.textContent = category.name;
          this.handleDispatchUnits(newValue);
          this.handleSortableFeature();
        }
        break;
      }
      case "data-number": {
        if (typeof newValue === "string") {
          this.#numberElement.textContent = newValue;
        } else {
          this.#numberElement.textContent = null;
        }
        break;
      }
    }
  }
}

export default WebDispatchGroup;
