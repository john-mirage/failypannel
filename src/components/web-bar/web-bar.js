class WebBar extends HTMLElement {
  #isMounted = false;
  #template;
  #titleElement;

  static get observedAttributes() {
    return ["data-title"];
  }

  get title() {
    return this.dataset.view;
  }

  set title(newTitle) {
    if (typeof newTitle === "string") {
      this.dataset.title = newTitle;
    } else {
      this.removeAttribute("data-title");
    }
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-bar");
    this.#template = template.content.cloneNode(true);
    this.#titleElement = this.#template.querySelector('[data-js="title"]');
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webBar");
      this.append(this.#template);
      this.#isMounted = true;
    }
    this.upgradeProperty("title");
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
      case "data-title":
        this.#titleElement.textContent = newValue;
        break;
    }
  }
}

export default WebBar;
