class WebView extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-view");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webView");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebView;
