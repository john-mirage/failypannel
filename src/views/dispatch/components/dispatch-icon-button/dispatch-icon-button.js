class DispatchIconButton extends HTMLButtonElement {
  #hasBeenMountedOnce = false;
  #svgElement;
  #iconElement;

  static get observedAttributes() {
    return ["data-icon"];
  }

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-dispatch-icon-button"
    ).content;
    this.#svgElement = templateContent.firstElementChild.cloneNode(true);
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

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchIconButton");
      this.append(this.#svgElement);
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
      }
    }
  }
}

export default DispatchIconButton;
