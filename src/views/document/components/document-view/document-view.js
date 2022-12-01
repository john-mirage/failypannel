class documentView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #headerElement;
  #bodyElement;

  constructor() {
    super();
    const templateContent = document.getElementById("template-document-view").content;
    this.#headerElement = templateContent.firstElementChild.cloneNode(true);
    this.#bodyElement = templateContent.lastElementChild.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("documentView");
      this.replaceChildren(this.#headerElement, this.#bodyElement);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default documentView;
