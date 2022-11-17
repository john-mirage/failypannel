import dispatchApi from "../../../api/dispatch-api";
import Sortable from "sortablejs";

class WebDispatchCategory extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #nameElement;
  #countElement;
  #listElement;
  #listItemElement = document.createElement("li");
  #cards = new Map();
  #sortableInstance;

  static get observedAttributes() {
    return ["data-id", "data-count"];
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-category");
    this.#template = template.content.firstElementChild.cloneNode(true);
    this.#nameElement = this.#template.querySelector('[data-js="name"]');
    this.#countElement = this.#template.querySelector('[data-js="count"]');
    this.#listElement = this.#template.querySelector('[data-js="list"]');
    this.#sortableInstance = new Sortable(this.#listElement, {
      onSort: () => {
        this.handleCategoryCardsCount();
      },
    });
  }

  get id() {
    return this.dataset.id;
  }

  set id(id) {
    if (typeof id === "string") {
      this.dataset.id = id;
    } else {
      this.removeAttribute("data-id");
    }
  }

  get count() {
    return this.dataset.count;
  }

  set count(newCount) {
    if (typeof newCount === "string") {
      this.dataset.count = newCount;
    } else {
      this.removeAttribute("data-count");
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webDispatchCategory");
      this.append(this.#template);
      this.#hasBeenMountedOnce = true;
    }
    this.upgradeProperty("id");
    this.upgradeProperty("count");
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  getCategoryCard(type) {
    if (typeof type === "string") {
      if (!this.#cards.has(type)) {
        const card = document.createElement(`web-dispatch-${type}`);
        this.#cards.set(type, card);
      }
      return this.#cards.get(type);
    } else {
      throw new Error("The type is not a string");
    }
  }

  handleCategoryCardsCount() {
    this.count = String(this.#listElement.children.length);
  }

  handleCategoryCards(categoryId, categoryType) {
    const cards = dispatchApi.getCategoryCards(categoryId);
    const cardsElements = cards.map((card) => {
      const listItemElement = this.#listItemElement.cloneNode(true);
      const cardElement = this.getCategoryCard(categoryType).cloneNode(true);
      cardElement.id = card.id;
      listItemElement.replaceChildren(cardElement);
      return listItemElement;
    });
    this.#listElement.replaceChildren(...cardsElements);
    this.handleCategoryCardsCount();
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-id": {
        if (typeof newValue === "string") {
          const category = dispatchApi.getCategoryById(newValue);
          this.#nameElement.textContent = category.name;
          this.handleCategoryCards(category.id, category.type);
          if (category.type === "unit") {
            this.#sortableInstance.option("group", category.type);
          }
        }
        break;
      }
      case "data-count": {
        this.#countElement.textContent = ` (${newValue})` ?? "";
        break;
      }
    }
  }
}

export default WebDispatchCategory;
