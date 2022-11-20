class WebDispatchIconButton extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #iconElement;

  static get observedAttributes() {
    return ["data-icon"];
  }

  constructor() {
    super();
    const template = document.getElementById(
      "template-web-dispatch-icon-button"
    );
    this.#template = template.content.firstElementChild.cloneNode(true);
    this.#iconElement = this.#template.querySelector('[data-js="icon"]');
    this.buttonElement = this.#template.querySelector('[data-js="button"]');
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
      this.classList.add("webDispatchIconButton");
      this.append(this.#template);
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

export default WebDispatchIconButton;
