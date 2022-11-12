class WebThemeButton extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-theme-button");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webThemeButton");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebThemeButton;
