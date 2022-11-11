class WebApp extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-app");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webApp");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebApp;
