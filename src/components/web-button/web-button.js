class WebPowerButton extends HTMLButtonElement {
  #hasBeenMountedOnce = false;
  #svgElement;
  #iconElement;
  #labelElement;

  static get observedAttributes() {
    return ["data-icon", "data-label"];
  }

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-web-button"
    ).content;
    this.#svgElement = templateContent.firstElementChild.cloneNode(true);
    this.#labelElement = templateContent.lastElementChild.cloneNode(true);
    this.#iconElement = this.#svgElement.querySelector('[data-js="icon"]');
  }

  get icon() {
    return this.dataset.icon;
  }

  set icon(newIcon) {
    if (typeof newIcon === "string") {
      this.dataset.icon = newIcon;
    } else {
      this.removeAttribute("data-icon");
    }
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
      this.classList.add("webButton");
      this.setAttribute("type", "button");
      this.replaceChildren(this.#svgElement, this.#labelElement);
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-icon": {
        if (typeof newValue === "string") {
          this.#iconElement.setAttribute("href", `#icon-${newValue}`);
        } else {
          this.#iconElement.removeAttribute("href");
        }
        break;
      }
      case "data-label": {
        this.#labelElement.textContent = newValue ?? "";
        break;
      }
    }
  }
}

export default WebPowerButton;
