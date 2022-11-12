class WebApp extends HTMLElement {
  #isMounted = false;
  #template;
  #webSidebar;
  #webView;

  static get observedAttributes() {
    return ["data-view", "data-enterprise"];
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

  get enterprise() {
    return this.dataset.enterprise;
  }

  set enterprise(newEnterprise) {
    if (typeof newEnterprise === "string") {
      this.dataset.enterprise = newEnterprise;
    } else {
      this.removeAttribute("data-enterprise");
    }
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-app");
    this.#template = template.content.cloneNode(true);
    this.#webSidebar = this.#template.querySelector('[data-js="web-sidebar"]');
    this.#webView = this.#template.querySelector('[data-js="web-view"]');
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webApp");
      this.append(this.#template);
      this.#isMounted = true;
    }
    this.upgradeProperty("view");
    this.upgradeProperty("enterprise");
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
        this.#webView.view = newValue;
      case "data-enterprise":
        this.#webSidebar.enterprise = newValue;
    }
  }
}

export default WebApp;
