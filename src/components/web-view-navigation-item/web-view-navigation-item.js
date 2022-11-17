class WebViewNavigationItem extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #buttonElement;

  static get observedAttributes() {
    return ["data-label", "data-active"];
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
    const template = document.getElementById(
      "template-web-view-navigation-item"
    );
    this.#template = template.content.cloneNode(true);
    this.#buttonElement = this.#template.querySelector('[data-js="button"]');
    this.handleButtonClickEvent = this.handleButtonClickEvent.bind(this);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webViewNavigationItem");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
    this.upgradeProperty("view");
    this.upgradeProperty("label");
    this.upgradeProperty("active");
    this.#buttonElement.addEventListener("click", this.handleButtonClickEvent);
  }

  disconnectedCallback() {
    this.#buttonElement.removeEventListener(
      "click",
      this.handleButtonClickEvent
    );
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  handleButtonLabel(newLabel) {
    if (typeof newLabel === "string") {
      this.#buttonElement.textContent = newLabel;
    } else {
      throw new Error("The new label is not a string");
    }
  }

  handleButtonState(isDisabled) {
    if (isDisabled) {
      this.#buttonElement.setAttribute("disabled", "");
    } else {
      this.#buttonElement.removeAttribute("disabled");
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-label": {
        this.handleButtonLabel(newValue ?? "");
        break;
      }
      case "data-active": {
        this.handleButtonState(typeof newValue === "string");
        break;
      }
    }
  }

  sendNavigationViewEvent() {
    if (this.view) {
      const customEvent = new CustomEvent("navigation-view", {
        bubbles: true,
        detail: { view: this.view },
      });
      this.dispatchEvent(customEvent);
    } else {
      throw new Error("The view data attribute is not defined");
    }
  }

  handleButtonClickEvent() {
    this.sendNavigationViewEvent();
  }
}

export default WebViewNavigationItem;
