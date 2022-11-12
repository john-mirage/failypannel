class WebPlate extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-plate");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webPlate");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebPlate;
