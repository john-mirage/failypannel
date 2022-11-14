class WebDispatchUnit extends HTMLElement {
  #isMounted = false;
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
    return ["data-number", "data-name", "data-role"];
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

  get role() {
    return this.dataset.role;
  }

  set role(newRole) {
    if (typeof newRole === "string") {
      this.dataset.role = newRole;
    } else {
      this.removeAttribute("data-role");
    }
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webDispatchUnit");
      this.append(this.#template);
      this.#isMounted = true;
    }
    this.upgradeProperty("number");
    this.upgradeProperty("name");
    this.upgradeProperty("role");
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
      case "data-number":
        this.#numberElement.textContent = newValue ?? "";
        break;
      case "data-name":
        this.#nameElement.textContent = newValue ?? "";
        break;
      case "data-role":
        this.#roleElement.textContent = newValue ?? "";
        break;
    }
  }
}

export default WebDispatchUnit;
