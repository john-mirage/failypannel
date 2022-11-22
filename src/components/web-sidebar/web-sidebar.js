class WebSidebar extends HTMLElement {
  #hasBeenMountedOnce = false;
  #menuElement;
  #settingsElement;

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-web-sidebar"
    ).content;
    this.#menuElement = templateContent.firstElementChild.cloneNode(true);
    this.#settingsElement = templateContent.lastElementChild.cloneNode(true);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webSidebar");
      this.replaceChildren(this.#menuElement, this.#settingsElement);
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default WebSidebar;
