class CarView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #bodyElement;

  constructor() {
    super();
    const templateContent =
      document.getElementById("template-car-view").content;
    this.#bodyElement = templateContent.firstElementChild.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("carView");
      this.replaceChildren(this.#bodyElement);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default CarView;
