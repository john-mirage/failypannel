class WebNavigationItem extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #buttonElement;
  #labelElement;
  #item;

  static get observedAttributes() {
    return ["data-active"];
  }

  constructor() {
    super();
    const template = document
      .getElementById("template-web-navigation-item")
      .content.cloneNode(true);
    this.#buttonElement = template.querySelector('[data-js="button"]');
    this.#labelElement = this.#buttonElement.querySelector('[data-js="label"]');
    this.handleButtonClickEvent = this.handleButtonClickEvent.bind(this);
  }

  get item() {
    return this.#item;
  }

  set item(newItem) {
    if (
      Object.keys(newItem).length === 2 &&
      newItem.hasOwnProperty("label") &&
      newItem.hasOwnProperty("view") &&
      typeof newItem.label === "string" &&
      typeof newItem.view === "string"
    ) {
      this.#item = newItem;
      this.#labelElement.textContent = this.#item.label;
    } else {
      throw new Error("The new item is not valid");
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

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webNavigationItem");
      this.replaceChildren(this.#buttonElement);
      this.#hasBeenMountedOnce = true;
    }
    this.#buttonElement.addEventListener("click", this.handleButtonClickEvent);
  }

  disconnectedCallback() {
    this.#buttonElement.removeEventListener(
      "click",
      this.handleButtonClickEvent
    );
  }

  sendAppViewEvent() {
    if (this.item) {
      const customEvent = new CustomEvent("app-view", {
        bubbles: true,
        detail: { view: this.item.view },
      });
      this.dispatchEvent(customEvent);
    } else {
      throw new Error("The item is not defined");
    }
  }

  handleButtonState(isDisabled) {
    if (isDisabled) {
      this.#buttonElement.setAttribute("disabled", "");
      this.sendAppViewEvent();
    } else {
      this.#buttonElement.removeAttribute("disabled");
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-active": {
        this.handleButtonState(typeof newValue === "string");
        break;
      }
    }
  }

  handleButtonClickEvent() {
    if (this.item) {
      const customEvent = new CustomEvent("app-navigation-item", {
        bubbles: true,
        detail: { activeItem: this },
      });
      this.dispatchEvent(customEvent);
    } else {
      throw new Error("The item is not defined");
    }
  }
}

export default WebNavigationItem;
