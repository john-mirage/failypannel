class WebSidebar extends HTMLElement {
  #isMounted = false;
  #template;
  #titleElement;
  #webNavigation;

  static get observedAttributes() {
    return ["data-enterprise", "data-view"];
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
    const template = document.getElementById("template-web-sidebar");
    this.#template = template.content.cloneNode(true);
    this.#titleElement = this.#template.querySelector('[data-js="title"]');
    this.#webNavigation = this.#template.querySelector(
      '[data-js="web-navigation"]'
    );
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webSidebar");
      this.append(this.#template);
      this.#isMounted = true;
    }
    this.upgradeProperty("enterprise");
    this.upgradeProperty("view");
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  clearTitleSize() {
    this.#titleElement.classList.remove(
      "webSidebar__title--sm",
      "webSidebar__title--md",
      "webSidebar__title--lg"
    );
  }

  addTitleSize(newTitleLength) {
    if (newTitleLength > 25) {
      this.#titleElement.classList.add("webSidebar__title--sm");
    } else if (newTitleLength > 15) {
      this.#titleElement.classList.add("webSidebar__title--md");
    } else {
      this.#titleElement.classList.add("webSidebar__title--lg");
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-enterprise":
        this.clearTitleSize();
        if (newValue) this.addTitleSize(newValue.length);
        this.#titleElement.textContent = newValue ?? "";
        break;
      case "data-view":
        this.#webNavigation.view = newValue;
        break;
    }
  }
}

export default WebSidebar;
