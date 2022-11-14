class WebDispatch extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webDispatch");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebDispatch;
