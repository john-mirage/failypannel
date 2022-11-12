class WebView extends HTMLElement {
  #isMounted = false;
  #template;
  #contentElement;

  static get observedAttributes() {
    return ["data-view"];
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
    const template = document.getElementById("template-web-view");
    this.#template = template.content.cloneNode(true);
    this.#contentElement = this.#template.querySelector('[data-js="content"]');
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webView");
      this.append(this.#template);
      this.#isMounted = true;
    }
    this.upgradeProperty("view");
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
      case "plate-check":
        this.#contentElement.replaceChildren("Verification de plaque");
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-view":
        this.switchView(newValue);
    }
  }
}

export default WebView;
