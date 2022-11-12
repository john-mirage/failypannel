class WebSidebar extends HTMLElement {
  #isMounted = false;
  #template;
  #titleElement;

  static get observedAttributes() {
    return ["data-enterprise"];
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
    const template = document.getElementById("template-web-sidebar");
    this.#template = template.content.cloneNode(true);
    this.#titleElement = this.#template.querySelector('[data-js="title"]');
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webSidebar");
      this.append(this.#template);
      this.#isMounted = true;
    }
    this.upgradeProperty("enterprise");
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
    }
  }
}

export default WebSidebar;
