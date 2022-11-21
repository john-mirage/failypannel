class WebBar extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #labelElement;

  static get observedAttributes() {
    return ["data-label"];
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-bar");
    this.#template = template.content.cloneNode(true);
    this.#labelElement = this.#template.querySelector('[data-js="label"]');
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
      this.replaceChildren(this.#template);
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
