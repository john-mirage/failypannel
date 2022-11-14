class WebBar extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #actions;
  #actionsElement;
  #titleElement;

  static get observedAttributes() {
    return ["data-label"];
  }

  get label() {
    return this.dataset.label;
  }

  set label(newLabel) {
    if (typeof newLabel === "string") {
      this.dataset.label = newLabel;
    } else {
      this.removeAttribute("data-label");
    }
  }

  get actions() {
    return this.#actions;
  }

  set actions(newActions) {
    this.#actions = newActions;
    this.#actionsElement.replaceChildren(...this.actions);
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-bar");
    this.#template = template.content.cloneNode(true);
    this.#actionsElement = this.#template.querySelector('[data-js="actions"]');
    this.#titleElement = this.#template.querySelector('[data-js="title"]');
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webBar");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
    this.upgradeProperty("label");
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
      case "data-label":
        this.#titleElement.textContent = newValue;
        break;
    }
  }
}

export default WebBar;
