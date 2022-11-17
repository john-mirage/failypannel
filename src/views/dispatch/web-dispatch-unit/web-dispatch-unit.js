import dispatchApi from "../../../api/dispatch-api";

class WebDispatchUnit extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #numberElement;
  #nameElement;
  #roleElement;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-unit");
    this.#template = template.content.cloneNode(true);
    this.#numberElement = this.#template.querySelector('[data-js="number"]');
    this.#nameElement = this.#template.querySelector('[data-js="name"]');
    this.#roleElement = this.#template.querySelector('[data-js="role"]');
  }

  static get observedAttributes() {
    return ["data-id"];
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

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webDispatchUnit");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
    this.upgradeProperty("id");
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
      case "data-id": {
        const unit = dispatchApi.getUnitById(newValue);
        this.#numberElement.textContent = unit.number;
        this.#nameElement.textContent = unit.name;
        this.#nameElement.setAttribute("title", unit.name);
        this.#roleElement.textContent = unit.role;
        break;
      }
    }
  }
}

export default WebDispatchUnit;
