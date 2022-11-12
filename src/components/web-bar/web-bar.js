class WebBar extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-bar");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webBar");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebBar;
