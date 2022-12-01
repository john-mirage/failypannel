class DocumentEditor extends HTMLFormElement {
  #hasBeenMountedOnce;
  #hiddenInputElement;
  #trixEditor;

  constructor() {
    super();
    const templateContent = document.getElementById("template-document-editor").content;
    this.#hiddenInputElement = templateContent.firstElementChild.cloneNode(true);
    this.#trixEditor = templateContent.lastElementChild.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("documentEditor");
      this.replaceChildren(this.#hiddenInputElement, this.#trixEditor);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default DocumentEditor;