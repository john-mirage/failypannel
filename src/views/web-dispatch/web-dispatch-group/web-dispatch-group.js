class WebDispatchGroup extends HTMLElement {
  #isMounted = false;
  #template;
  #nameElement;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-group");
    this.#template = template.content.cloneNode(true);
    this.#nameElement = this.#template.querySelector('[data-js="name"]');
  }

  static get observedAttributes() {
    return ["data-name"];
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

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webDispatchUnit");
      this.append(this.#template);
      this.#isMounted = true;
    }
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
      case "data-name":
        this.#nameElement.textContent = newValue ?? "";
        break;
    }
  }
}

export default WebDispatchGroup;
