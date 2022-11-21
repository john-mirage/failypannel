class WebSwitch extends HTMLLabelElement {
  #hasBeenMountedOnce = false;
  #labelElement;

  static get observedAttributes() {
    return ["data-label"];
  }

  constructor() {
    super();
    const template = document
      .getElementById("template-web-switch")
      .content.cloneNode(true);
    this.#labelElement = template.querySelector('[data-js="label"]');
    this.inputElement = template.querySelector('[data-js="input"]');
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

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webSwitch");
      this.replaceChildren(this.#labelElement, this.inputElement);
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-label": {
        this.#labelElement.textContent = newValue ?? "";
        break;
      }
    }
  }
}

export default WebSwitch;
