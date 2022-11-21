import navigationItems from "../../data/navigation-items.json";

const DEFAULT_ITEM = 2;

class WebNavigation extends HTMLElement {
  #hasBeenMountedOnce = false;
  #listElement;
  #activeItem;

  constructor() {
    super();
    const template = document
      .getElementById("template-web-navigation")
      .content.cloneNode(true);
    this.#listElement = template.querySelector('[data-js="list"]');
    this.handleActiveItemEvent = this.handleActiveItemEvent.bind(this);
  }

  get activeItem() {
    return this.#activeItem;
  }

  set activeItem(newActiveItem) {
    if (newActiveItem instanceof HTMLLIElement) {
      if (this.#activeItem) this.#activeItem.active = false;
      this.#activeItem = newActiveItem;
      this.#activeItem.active = true;
    } else {
      throw new Error("The new Active item is not valid");
    }
  }

  handleInitialItems() {
    const webNavigationItems = navigationItems.map((navigationItem, index) => {
      const webNavigationItem = document.createElement("li", {
        is: "web-navigation-item",
      });
      webNavigationItem.item = navigationItem;
      if (index === DEFAULT_ITEM) this.activeItem = webNavigationItem;
      return webNavigationItem;
    });
    this.#listElement.replaceChildren(...webNavigationItems);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webNavigation");
      this.replaceChildren(this.#listElement);
      this.handleInitialItems();
      this.#hasBeenMountedOnce = true;
    }
    this.addEventListener("app-navigation-item", this.handleActiveItemEvent);
  }

  disconnectedCallback() {
    this.removeEventListener("app-navigation-item", this.handleActiveItemEvent);
  }

  handleActiveItemEvent(customEvent) {
    const { activeItem } = customEvent.detail;
    if (activeItem instanceof HTMLLIElement) {
      this.activeItem = activeItem;
    } else {
      throw new Error("The active item is not defined in the custom event");
    }
  }
}

export default WebNavigation;
