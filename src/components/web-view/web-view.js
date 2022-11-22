class WebView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #views = new Map();

  static get observedAttributes() {
    return ["data-view"];
  }

  constructor() {
    super();
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
      this.classList.add("webView");
      this.#hasBeenMountedOnce = true;
    }
  }

  getViewElement(viewName) {
    if (typeof viewName === "string") {
      if (!this.#views.has(viewName)) {
        const view = document.createElement("article", { is: viewName });
        this.#views.set(viewName, view);
      }
      return this.#views.get(viewName);
    } else {
      throw new Error("The view name is not a string");
    }
  }

  handleViewChange(viewName) {
    const viewElement = this.getViewElement(viewName);
    this.replaceChildren(viewElement);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-view": {
        if (typeof newValue === "string") {
          this.handleViewChange(newValue);
        }
        break;
      }
    }
  }
}

export default WebView;
