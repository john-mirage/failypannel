import dispatchApi from "../../../api/dispatch-api";

class WebDispatch extends HTMLElement {
  #hasBeenMountedOnce = false;
  #template;
  #gridElement;
  #webDispatchCategory = document.createElement("web-dispatch-category");

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch");
    this.#template = template.content.cloneNode(true);
    this.#gridElement = this.#template.querySelector('[data-js="grid"]');
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webDispatch");
      this.append(this.#template);
      this.handleCategories();
      this.#hasBeenMountedOnce = true;
    }
  }

  getWebDispatchCategory(id, type, name) {
    const webDispatchCategory = this.#webDispatchCategory.cloneNode(true);
    webDispatchCategory.id = id;
    webDispatchCategory.type = type;
    webDispatchCategory.name = name;
    return webDispatchCategory;
  }

  handleGridColumns(numberOfColumns) {
    if (typeof numberOfColumns === "number") {
      const gridTemplateColumns = `repeat(${String(numberOfColumns)}, 296px)`;
      this.#gridElement.style.gridTemplateColumns = gridTemplateColumns;
    } else {
      throw new Error("The number of columns argument is not a number");
    }
  }

  handleCategories() {
    const categories = dispatchApi.categories;
    if (categories.length > 0) {
      const webDispatchCategories = categories.map((category) => {
        return this.getWebDispatchCategory(
          category.id,
          category.type,
          category.name
        );
      });
      this.#gridElement.replaceChildren(...webDispatchCategories);
      this.handleGridColumns(webDispatchCategories.length);
    } else {
      this.#gridElement.replaceChildren();
      this.#gridElement.style.gridTemplateColumns = "none";
    }
  }
}

export default WebDispatch;
