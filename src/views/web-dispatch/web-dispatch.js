import dispatchApi from "../../api/dispatch-api";

class WebDispatch extends HTMLElement {
  #isMounted = false;
  #template;
  #webBar;
  #bodyElement;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch");
    this.#template = template.content.cloneNode(true);
    this.#webBar = this.#template.querySelector('[data-js="web-bar"]');
    this.#bodyElement = this.#template.querySelector('[data-js="body"]');
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webDispatch");
      this.append(this.#template);
      const addGroupButton = document.createElement(
        "web-dispatch-add-group-button"
      );
      this.#webBar.actions = [addGroupButton];
      this.#isMounted = true;
    }
    const webDispatchCategories = dispatchApi.categories.map((category) => {
      const webDispatchCategory = document.createElement(
        "web-dispatch-category"
      );
      webDispatchCategory.id = category.id;
      webDispatchCategory.type = category.type;
      webDispatchCategory.name = category.name;
      return webDispatchCategory;
    });
    this.#bodyElement.replaceChildren(...webDispatchCategories);
  }
}

export default WebDispatch;
