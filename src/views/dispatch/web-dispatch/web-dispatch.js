import dispatchApi from "../../../api/dispatch-api";

class WebDispatch extends HTMLElement {
  #isMounted = false;
  #template;
  #gridElement;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch");
    this.#template = template.content.cloneNode(true);
    this.#gridElement = this.#template.querySelector('[data-js="grid"]');
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webDispatch");
      this.append(this.#template);
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
    )}, 296px)`;
    this.#gridElement.replaceChildren(...webDispatchCategories);
  }
}

export default WebDispatch;
