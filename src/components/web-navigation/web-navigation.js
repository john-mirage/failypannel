class WebNavigation extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #activeNavigationItem;

  constructor() {
    super();
    const template = document.getElementById("template-web-navigation");
    this.#template = template.content.cloneNode(true);
    this.handleActiveNavigationItem =
      this.handleActiveNavigationItem.bind(this);
  }

  get activeNavigationItem() {
    return this.#activeNavigationItem;
  }

  set activeNavigationItem(newActiveNavigationItem) {
    if (this.activeNavigationItem) {
      this.activeNavigationItem.active = false;
    }
    this.#activeNavigationItem = newActiveNavigationItem;
    this.activeNavigationItem.active = true;
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webNavigation");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
    const firstNavigationItem = this.querySelector("web-navigation-item");
    if (firstNavigationItem) {
      this.activeNavigationItem = firstNavigationItem;
    } else {
      throw new Error("No navigation items found in the navigation");
    }
    this.addEventListener(
      "active-navigation-item-update",
      this.handleActiveNavigationItem
    );
  }

  disconnectedCallback() {
    this.removeEventListener(
      "active-navigation-item-update",
      this.handleActiveNavigationItem
    );
  }

  handleActiveNavigationItem(customEvent) {
    const { navigationItem } = customEvent.detail;
    if (navigationItem instanceof HTMLElement) {
      this.activeNavigationItem = navigationItem;
    } else {
      throw new Error("The navigation item is not defined in the custom event");
    }
  }
}

export default WebNavigation;
