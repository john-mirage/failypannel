import dispatchApi from "../../api/dispatch-api";

class WebDispatch extends HTMLElement {
  #isMounted = false;
  #template;
  #webBar;
  #gridElement;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch");
    this.#template = template.content.cloneNode(true);
    this.#webBar = this.#template.querySelector('[data-js="web-bar"]');
    this.#gridElement = this.#template.querySelector('[data-js="grid"]');
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webDispatch");
      this.append(this.#template);
      const addGroupButton = document.createElement(
        "web-dispatch-add-group-button"
      );
      this.#webBar.actions = [addGroupButton];
      this.handleCategories();
      this.#isMounted = true;
    }
  }

  handleCategories() {
    const webDispatchCategories = dispatchApi.categories.map((category) => {
      const webDispatchCategory = document.createElement(
        "web-dispatch-category"
      );
      webDispatchCategory.id = category.id;
      webDispatchCategory.type = category.type;
      webDispatchCategory.name = category.name;
      return webDispatchCategory;
    });
    this.#gridElement.style.gridTemplateColumns = `repeat(${String(
      webDispatchCategories.length
    )}, 280px)`;
    this.#gridElement.replaceChildren(...webDispatchCategories);
  }
}

export default WebDispatch;
