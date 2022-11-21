class WebApp extends HTMLDivElement {
  #hasBeenMountedOnce = false;
  #webBar;
  #rowElement;
  #webView;

  static get observedAttributes() {
    return ["data-mode", "data-view"];
  }

  constructor() {
    super();
    const template = document
      .getElementById("template-web-app")
      .content.cloneNode(true);
    this.#webBar = template.querySelector('[data-js="bar"]');
    this.#rowElement = template.querySelector('[data-js="row"]');
    this.#webView = this.#rowElement.querySelector('[data-js="view"]');
    this.handleAppViewEvent = this.handleAppViewEvent.bind(this);
    this.handleAppModeEvent = this.handleAppModeEvent.bind(this);
    this.handleAppShutdownEvent = this.handleAppShutdownEvent.bind(this);
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
    this.addEventListener("app-view", this.handleAppViewEvent);
    this.addEventListener("app-mode", this.handleAppModeEvent);
    this.addEventListener("app-shutdown", this.handleAppShutdownEvent);
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webApp");
      this.replaceChildren(this.#webBar, this.#rowElement);
      this.#hasBeenMountedOnce = true;
    }
  }

  disconnectedCallback() {
    this.removeEventListener("app-view", this.handleAppViewEvent);
    this.removeEventListener("app-mode", this.handleAppModeEvent);
    this.removeEventListener("app-shutdown", this.handleAppShutdownEvent);
  }

  handleAppMode(newMode) {
    switch (newMode) {
      case "window": {
        document.documentElement.dataset.mode = "window";
        break;
      }
      case "screen": {
        document.documentElement.dataset.mode = "screen";
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
        } else {
          document.documentElement.removeAttribute("data-mode");
        }
        break;
      }
      case "data-view": {
        if (typeof newValue === "string") {
          this.#webView.dataset.view = newValue;
        } else {
          this.#webView.removeAttribute("data-view");
        }
        break;
      }
    }
  }

  handleAppViewEvent(customEvent) {
    const { view } = customEvent.detail;
    if (typeof view === "string") {
      this.view = view;
    } else {
      throw new Error("The view is not defined in the custom event");
    }
  }

  handleAppModeEvent(customEvent) {
    const { mode } = customEvent.detail;
    if (typeof mode === "string") {
      this.handleAppMode(mode);
    } else {
      throw new Error("The mode is not defined in the custom event");
    }
  }

  handleAppShutdownEvent() {
    this.remove();
  }
}

export default WebApp;
