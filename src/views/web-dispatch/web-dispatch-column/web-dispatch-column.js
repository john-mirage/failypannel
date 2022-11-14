class WebDispatchColumn extends HTMLElement {
  #isMounted = false;
  #template;
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

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-column");
    this.#template = template.content.cloneNode(true);
    this.#titleElement = this.#template.querySelector('[data-js="title"]');
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webDispatchColumn");
      this.append(this.#template);
      this.#isMounted = true;
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
        this.#titleElement.textContent = newValue ?? "";
        break;
    }
  }
}

export default WebDispatchColumn;
