class WebInvestigationView extends HTMLElement {
  #isMounted = false;
  #template;

  constructor() {
    super();
    const template = document.getElementById("template-web-investigation-view");
    this.#template = template.content.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webInvestigationView");
      this.append(this.#template);
      this.#isMounted = true;
    }
  }
}

export default WebInvestigationView;
