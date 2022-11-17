class WebViewNavigation extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #navigationElement;

  static get observedAttributes() {
    return ["data-view"];
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-view-navigation");
    this.#template = template.content.cloneNode(true);
    this.#navigationElement = this.#template.querySelector(
      '[data-js="navigation"]'
    );
    this.handleViewChangeEvent = this.handleViewChangeEvent.bind(this);
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

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webViewNavigation");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
    this.upgradeProperty("view");
    this.addEventListener("navigation-view", this.handleViewChangeEvent);
  }

  disconnectedCallback() {
    this.removeEventListener("navigation-view", this.handleViewChangeEvent);
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  handleInitialViewChange(newView) {
    if (typeof newView === "string") {
      const newNavigationItem = this.#navigationElement.querySelector(
        `[data-view="${newView}"]`
      );
      if (newNavigationItem instanceof HTMLElement) {
        newNavigationItem.active = true;
      } else {
        throw new Error("The new navigation item is not found");
      }
    } else {
      throw new Error("The new view is not a string");
    }
  }

  handleViewChange(oldView, newView) {
    if (typeof oldView === "string" && typeof newView === "string") {
      const oldNavigationItem = this.#navigationElement.querySelector(
        `[data-view="${oldView}"]`
      );
      const newNavigationItem = this.#navigationElement.querySelector(
        `[data-view="${newView}"]`
      );
      if (
        oldNavigationItem instanceof HTMLElement &&
        newNavigationItem instanceof HTMLElement
      ) {
        oldNavigationItem.active = false;
        newNavigationItem.active = true;
      } else {
        throw new Error("Old and/or new navigation items are not found");
      }
    } else {
      throw new Error("Both old and new view need to be strings");
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "data-view": {
        if (oldValue && newValue) {
          this.handleViewChange(oldValue, newValue);
        } else if (!oldValue && newValue) {
          this.handleInitialViewChange(newValue);
        }
        break;
      }
    }
  }

  handleViewChangeEvent(customEvent) {
    const { view } = customEvent.detail;
    if (typeof view === "string") {
      this.view = view;
    } else {
      throw new Error("The view is not defined in the custom event");
    }
  }
}

export default WebViewNavigation;
