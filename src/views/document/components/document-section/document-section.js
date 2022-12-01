class DocumentSection extends HTMLElement {
  #hasBeenMountedOnce;
  #labelElement = document.createElement("h3");

  static get observedAttributes() {
    return ["data-label"];
  }

  constructor() {
    super();
    this.#labelElement.classList.add("documentSection__title");
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
      this.classList.add("documentSection");
      this.replaceChildren(this.#labelElement);
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

export default DocumentSection;