class DispatchToolbar extends HTMLElement {
  #hasBeenMountedOnce = false;
  #leftElement;
  #rightElement;

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-dispatch-toolbar"
    ).content;
    this.#leftElement = templateContent.firstElementChild.cloneNode(true);
    this.#rightElement = templateContent.lastElementChild.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchToolbar");
      this.replaceChildren(this.#leftElement, this.#rightElement);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default DispatchToolbar;
