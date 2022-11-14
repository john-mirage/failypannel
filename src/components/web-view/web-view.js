class WebView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #webCarPlateView;
  #webInvestigationView;
  #webDispatchView;

  static get observedAttributes() {
    return ["data-view"];
  }

  get webCarPlateView() {
    if (!(this.#webCarPlateView instanceof HTMLElement)) {
      this.#webCarPlateView = document.createElement("web-car-plate");
    }
    return this.#webCarPlateView;
  }

  get webInvestigationView() {
    if (!(this.#webInvestigationView instanceof HTMLElement)) {
      this.#webInvestigationView = document.createElement("web-investigation");
    }
    return this.#webInvestigationView;
  }

  get webDispatchView() {
    if (!(this.#webDispatchView instanceof HTMLElement)) {
      this.#webDispatchView = document.createElement("web-dispatch");
    }
    return this.#webDispatchView;
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

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webView");
      this.#hasBeenMountedOnce = true;
    }
    this.upgradeProperty("view");
    this.view = "plate-view";
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  switchView(newView) {
    switch (newView) {
      case "plate-view":
        this.replaceChildren(this.webCarPlateView);
        break;
      case "investigation-view":
        this.replaceChildren(this.webInvestigationView);
        break;
      case "dispatch-view":
        this.replaceChildren(this.webDispatchView);
        break;
      default:
        throw new Error("The view is not valid");
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-view":
        this.switchView(newValue);
        break;
    }
  }
}

export default WebView;
