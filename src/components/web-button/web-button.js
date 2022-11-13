class WebPowerButton extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-power-button");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webPowerButton");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebPowerButton;
