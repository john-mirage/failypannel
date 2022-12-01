import WebToolbar from "../../../../components/web-toolbar";

class DispatchToolbar extends WebToolbar {
  #hasBeenMountedOnce = false;
  #createCategoryButton = document.createElement("button", { is: "web-button" });

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.#createCategoryButton.label = "Créer une catégorie";
      this.rightElement.replaceChildren(this.#createCategoryButton);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default DispatchToolbar;