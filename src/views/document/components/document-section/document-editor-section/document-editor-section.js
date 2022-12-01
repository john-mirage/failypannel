import DocumentSection from "../document-section";

class DocumentEditorSection extends DocumentSection {
  #hasBeenMountedOnce;
  #editorElement = document.createElement("form", { is: "document-editor" });

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.append(this.#editorElement);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default DocumentEditorSection;