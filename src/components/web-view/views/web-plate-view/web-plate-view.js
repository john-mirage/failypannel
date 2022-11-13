class WebPlateView extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-plate-view");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webPlateView");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebPlateView;
