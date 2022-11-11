class WebNavigation extends HTMLElement {
  #isMounted = false;
  #template;
  #listElement;

  constructor() {
    super();
    const template = document.getElementById("template-web-navigation");
    this.#template = template.content.cloneNode(true);
    this.#listElement = this.#template.querySelector('[data-js="list"]');
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webNavigation");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebNavigation;
