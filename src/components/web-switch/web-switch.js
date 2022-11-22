class WebSwitch extends HTMLLabelElement {
  #hasBeenMountedOnce = false;
  #labelElement;

  static get observedAttributes() {
    return ["data-label"];
  }

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-web-switch"
    ).content;
    this.#labelElement = templateContent.firstElementChild.cloneNode(true);
    this.inputElement = templateContent.lastElementChild.cloneNode(true);
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
