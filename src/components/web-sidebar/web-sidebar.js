class WebSidebar extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-sidebar");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webSidebar");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebSidebar;
