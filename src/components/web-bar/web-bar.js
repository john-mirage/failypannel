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
    const templateContent = document.getElementById("template-web-bar").content;
    this.#leftElement = templateContent.firstElementChild.cloneNode(true);
    this.#rightElement = templateContent.lastElementChild.cloneNode(true);
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
