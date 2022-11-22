class documentView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #bodyElement;

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-document-view"
    ).content;
    this.#bodyElement = templateContent.firstElementChild.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("documentView");
      this.replaceChildren(this.#bodyElement);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default documentView;
