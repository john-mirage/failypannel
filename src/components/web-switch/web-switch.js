class WebSwitch extends HTMLElement {
  #isMounted = false;

  constructor() {
    super();
    const template = document.getElementById("template-web-switch");
    this.template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webSwitch");
      this.append(this.template);
      this.#isMounted = true;
    }
  }
}

export default WebSwitch;
