class WebDispatch extends HTMLElement {
  #isMounted = false;
  #template;
  #webBar;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch");
    this.#template = template.content.cloneNode(true);
    this.#webBar = this.#template.querySelector('[data-js="web-bar"]');
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webDispatch");
      this.append(this.#template);
      const addGroupButton = document.createElement(
        "web-dispatch-add-group-button"
      );
      this.#webBar.actions = [addGroupButton];
      this.#isMounted = true;
    }
  }
}

export default WebDispatch;
