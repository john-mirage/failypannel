class WebSidebar extends HTMLElement {
  #hasBeenMountedOnce = false;
  #menuElement;
  #settingsElement;

  constructor() {
    super();
    const template = document
      .getElementById("template-web-sidebar")
      .content.cloneNode(true);
    this.#menuElement = template.querySelector('[data-js="menu"]');
    this.#settingsElement = template.querySelector('[data-js="settings"]');
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
