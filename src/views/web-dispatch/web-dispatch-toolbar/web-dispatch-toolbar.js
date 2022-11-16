class WebDispatch extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-toolbar");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webDispatchToolbar");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebDispatch;
