import WebToolbar from "../../../../components/web-toolbar";

class DocumentToolbar extends WebToolbar {
  #hasBeenMountedOnce = false;
  #createDocumentButton = document.createElement("button", { is: "web-button" });

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.#createDocumentButton.label = "Créer un document";
      this.rightElement.replaceChildren(this.#createDocumentButton);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default DocumentToolbar;