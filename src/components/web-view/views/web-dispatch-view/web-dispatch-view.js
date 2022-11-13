class WebDispatchView extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-view");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webDispatchView");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebDispatchView;
