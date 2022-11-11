class WebNavigationItem extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-navigation-item");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webNavigationItem");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebNavigationItem;
