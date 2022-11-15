import dispatchApi from "../../../api/dispatch-api";

class WebDispatchCategory extends HTMLElement {
  #isMounted = false;
  #template;
  #nameElement;
  #listElement;

  static get observedAttributes() {
    return ["data-id", "data-type", "data-name"];
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

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-category");
    this.#template = template.content.cloneNode(true);
    this.#nameElement = this.#template.querySelector('[data-js="name"]');
    this.#listElement = this.#template.querySelector('[data-js="list"]');
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webDispatchCategory");
      this.append(this.#template);
      this.#isMounted = true;
    }
    this.upgradeProperty("id");
    this.upgradeProperty("type");
    this.upgradeProperty("name");
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
    }
  }

  getWebDispatchGroup(group) {
    const webDispatchGroup = document.createElement("web-dispatch-group");
    webDispatchGroup.categoryId = group.categoryId;
    webDispatchGroup.id = group.id;
    webDispatchGroup.name = group.name;
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
        case "group":
          const groups = dispatchApi.getCategoryGroups(this.id);
          // console.log(groups);
          const webDispatchGroups = groups.map((group) => {
            return this.getWebDispatchGroup(group);
          });
          this.#listElement.replaceChildren(...webDispatchGroups);
          break;
        case "unit":
          const units = dispatchApi.getCategoryUnits(this.id);
          // console.log(units);
          const webDispatchUnits = units.map((unit) => {
            return this.getWebDispatchUnit(unit);
          });
          this.#listElement.replaceChildren(...webDispatchUnits);
          break;
        default:
          throw new Error("The category type is not valid");
      }
    }
  }
}

export default WebDispatchCategory;
