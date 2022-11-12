class WebSidebar extends HTMLElement {
  #isMounted = false;
  #template;
  #titleElement;

  static get observedAttributes() {
    return ["data-label"];
  }

  get label() {
    return this.dataset.label;
  }

  set label(newLabel) {
    if (typeof newLabel === "string") {
      this.dataset.label = newLabel;
    } else {
      this.removeAttribute("data-label");
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
      case "data-label":
        const newTitle = newValue ?? "";
        this.clearTitleSize();
        this.addTitleSize(newTitle.length);
        this.#titleElement.textContent = newTitle;
    }
  }
}

export default WebSidebar;
