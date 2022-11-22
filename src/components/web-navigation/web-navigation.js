import navigationItems from "../../data/navigation-items.json";

const DEFAULT_ITEM = 2;

class WebNavigation extends HTMLElement {
  #hasBeenMountedOnce = false;
  #listElement;
  #activeItem;

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-web-navigation"
    ).content;
    this.#listElement = templateContent.firstElementChild.cloneNode(true);
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
    const webNavigationItems = navigationItems.map((navigationItem) => {
      const webNavigationItem = document.createElement("li", {
        is: "web-navigation-item",
      });
      webNavigationItem.item = navigationItem;
      return webNavigationItem;
    });
    this.#listElement.replaceChildren(...webNavigationItems);
  }

  connectedCallback() {
    this.addEventListener("app-navigation-item", this.handleActiveItemEvent);
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webNavigation");
      this.replaceChildren(this.#listElement);
      this.handleInitialItems();
      this.activeItem = this.#listElement.children[DEFAULT_ITEM];
      this.#hasBeenMountedOnce = true;
    }
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
