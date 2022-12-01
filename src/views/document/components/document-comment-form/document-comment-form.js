class DocumentCommentForm extends HTMLFormElement {
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

export default DocumentCommentForm;