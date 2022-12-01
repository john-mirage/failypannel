import DocumentSection from "../document-section";

class DocumentCardSection extends DocumentSection {
  #hasBeenMountedOnce;
  #listElement = document.createElement("ul");

  constructor() {
    super();
    this.#listElement.classList.add("documentSection__list");
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.append(this.#listElement);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default DocumentCardSection;