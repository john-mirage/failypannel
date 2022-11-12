class WebNavigation extends HTMLElement {
  #isMounted = false;
  #template;

  static get observedAttributes() {
    return ["data-view"];
  }

  get view() {
    return this.dataset.view;
  }

  set view(newView) {
    if (typeof newView === "string") {
      this.dataset.view = newView;
    } else {
      this.removeAttribute("data-view");
    }
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-navigation");
    this.#template = template.content.cloneNode(true);
    this.handleNewActiveNavigationItem =
      this.handleNewActiveNavigationItem.bind(this);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webNavigation");
      this.append(this.#template);
      this.#isMounted = true;
    }
    this.upgradeProperty("view");
    this.addEventListener(
      "active-navigation-item-update",
      this.handleNewActiveNavigationItem
    );
  }

  disconnectedCallback() {
    this.removeEventListener(
      "active-navigation-item-update",
      this.handleNewActiveNavigationItem
    );
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  clearActiveItems() {
    const items = this.querySelectorAll("web-navigation-item");
    items.forEach((item) => {
      if (item.active) item.active = false;
    });
  }

  selectActiveItem(view) {
    const newActiveNavigationItem = this.querySelector(`[data-view="${view}"]`);
    newActiveNavigationItem.active = true;
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-view":
        this.clearActiveItems();
        this.selectActiveItem(newValue);
        break;
    }
  }

  handleNewActiveNavigationItem(customEvent) {
    const { view } = customEvent.detail;
    this.clearActiveItems();
    this.selectActiveItem(view);
  }
}

export default WebNavigation;
