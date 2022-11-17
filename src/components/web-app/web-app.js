class WebApp extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #viewElement;

  static get observedAttributes() {
    return ["data-mode", "data-view"];
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-app");
    this.#template = template.content.firstElementChild.cloneNode(true);
    this.#viewElement = this.#template.querySelector('[data-js="view"]');
    this.handleAppView = this.handleAppView.bind(this);
    this.handleAppSize = this.handleAppMode.bind(this);
  }

  get mode() {
    return this.dataset.mode;
  }

  set mode(newMode) {
    if (typeof newMode === "string") {
      this.dataset.mode = newMode;
    } else {
      this.removeAttribute("data-mode");
    }
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
      this.classList.add("webApp");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
    this.upgradeProperty("mode");
    this.upgradeProperty("view");
    this.addEventListener("app-view-update", this.handleAppView);
    this.addEventListener("app-mode-update", this.handleAppMode);
  }

  disconnectedCallback() {
    this.removeEventListener("app-view-update", this.handleAppView);
    this.removeEventListener("app-mode-update", this.handleAppMode);
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  handleAppView(customEvent) {
    const { view } = customEvent.detail;
    if (typeof view === "string") {
      this.view = view;
    } else {
      throw new Error("The view is not defined in the custom event");
    }
  }

  handleAppMode(mode) {
    switch (mode) {
      case "window": {
        this.classList.remove("webApp--fullScreen");
        this.classList.add("webApp--window");
        break;
      }
      case "screen": {
        this.classList.remove("webApp--window");
        this.classList.add("webApp--fullScreen");
        break;
      }
      default: {
        throw new Error("The app mode is not valid");
      }
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-mode": {
        if (typeof newValue === "string") {
          this.handleAppMode(newValue);
        }
        break;
      }
      case "data-view": {
        if (typeof newValue === "string") {
          this.#viewElement.view = newValue;
        }
        break;
      }
    }
  }
}

export default WebApp;
