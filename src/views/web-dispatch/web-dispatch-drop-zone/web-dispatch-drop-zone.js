class WebDispatchDropZone extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #messageElement;

  static get observedAttributes() {
    return ["data-type"];
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-drop-zone");
    this.#template = template.content.cloneNode(true);
    this.#messageElement = this.#template.querySelector('[data-js="message"]');
  }

  get type() {
    return this.dataset.type;
  }

  set type(newType) {
    if (typeof newType === "string") {
      this.dataset.type = newType;
    } else {
      this.removeAttribute("data-type");
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webDispatchDropZone");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
    this.upgradeProperty("type");
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
      case "data-type":
        this.handleMessage(newValue);
        break;
    }
  }

  handleMessage(type) {
    if (type) {
      switch (type) {
        case "group":
          this.#messageElement.textContent =
            "Déposer un groupe dans cette emplacement";
          break;
        case "unit":
          this.#messageElement.textContent =
            "Déposer une unité dans cette emplacement";
          break;
        default:
          throw new Error("The drop zone type is not valid");
      }
    }
  }
}

export default WebDispatchDropZone;
