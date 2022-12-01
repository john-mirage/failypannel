class DocumentComment extends HTMLElement {
  #hasBeenMountedOnce;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default DocumentComment;