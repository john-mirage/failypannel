class WebNavigationItem extends HTMLElement {
  #isMounted = false;
  #template;
  #buttonElement;

  static get observedAttributes() {
    return ["data-view", "data-label", "data-active"];
  }

  get view() {
    return this.dataset.view;
  }

  set view(newView) {
    if (typeof newView === "string") {
      this.dataset.view = newView;
    } else {
      this.removeAttribute("data-view");
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

  get active() {
    return this.hasAttribute("data-active");
  }

  set active(isActive) {
    if (isActive) {
      this.setAttribute("data-active", "");
    } else {
      this.removeAttribute("data-active");
    }
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-navigation-item");
    this.#template = template.content.cloneNode(true);
    this.#buttonElement = this.#template.querySelector('[data-js="button"]');
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webNavigationItem");
      this.append(this.#template);
      this.#isMounted = true;
    }
    this.upgradeProperty("label");
    this.upgradeProperty("active");
    this.#buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    this.#buttonElement.removeEventListener("click", this.handleButtonClick);
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
        this.#buttonElement.textContent = newValue ?? "";
        break;
      case "data-active":
        if (newValue !== null) {
          this.#buttonElement.setAttribute("disabled", "");
        } else {
          this.#buttonElement.removeAttribute("disabled");
        }
        break;
    }
  }

  handleButtonClick() {
    if (this.view) {
      const customEvent = new CustomEvent("active-navigation-item-update", {
        bubbles: true,
        detail: { view: this.view },
      });
      this.dispatchEvent(customEvent);
    }
  }
}

export default WebNavigationItem;
