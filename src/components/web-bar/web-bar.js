class WebBar extends HTMLElement {
  #hasBeenMountedOnce = false;
  #leftElement;
  #rightElement;
  #labelElement;

  static get observedAttributes() {
    return ["data-label"];
  }

  constructor() {
    super();
    const template = document
      .getElementById("template-web-bar")
      .content.cloneNode(true);
    this.#leftElement = template.querySelector('[data-js="left"]');
    this.#rightElement = template.querySelector('[data-js="right"]');
    this.#labelElement = this.#leftElement.querySelector('[data-js="label"]');
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
      this.classList.add("webBar");
      this.replaceChildren(this.#leftElement, this.#rightElement);
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

export default WebBar;
