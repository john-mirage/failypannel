class WebApp extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #viewElement;

  static get observedAttributes() {
    return ["data-view"];
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-app");
    this.#template = template.content.cloneNode(true);
    this.#viewElement = this.#template.querySelector('[data-js="view"]');
    this.handleViewUpdate = this.handleViewUpdate.bind(this);
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
    this.upgradeProperty("view");
    this.addEventListener("active-view-update", this.handleViewUpdate);
  }

  disconnectedCallback() {
    this.removeEventListener("active-view-update", this.handleViewUpdate);
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
      case "data-view":
        this.#viewElement.view = newValue;
        break;
    }
  }

  handleViewUpdate(customEvent) {
    const { view } = customEvent.detail;
    if (typeof view === "string") {
      this.view = view;
    } else {
      throw new Error("The view is not defined in the custom event");
    }
  }
}

export default WebApp;
