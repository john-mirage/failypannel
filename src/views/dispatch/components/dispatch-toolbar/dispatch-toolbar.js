class DispatchToolbar extends HTMLElement {
  #hasBeenMountedOnce = false;
  #leftElement;
  #rightElement;
  #buttonElement;

  constructor() {
    super();
    const templateContent = document.getElementById("template-dispatch-toolbar").content;
    this.#leftElement = templateContent.firstElementChild.cloneNode(true);
    this.#rightElement = templateContent.lastElementChild.cloneNode(true);
    this.#buttonElement = this.#rightElement.querySelector('[data-js="add-category-button"]');
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchToolbar");
      this.replaceChildren(this.#leftElement, this.#rightElement);
      this.#hasBeenMountedOnce = true;
    }
    this.#buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    this.#buttonElement.removeEventListener("click", this.handleButtonClick);
  }

  handleButtonClick() {
    const customEvent = new CustomEvent("dispatch-create-category", {
      bubbles: true,
      detail: {
        categoryName: "Test",
        categoryType: "group",
      }
    });
    this.dispatchEvent(customEvent);
  }
}

export default DispatchToolbar;
