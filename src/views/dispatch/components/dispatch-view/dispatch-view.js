import dispatchCategoryAPI from "../../api/dispatch-category.api";

class DispatchView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #headerElement;
  #listElement;
  #dispatchGroupCategory = document.createElement("li", { is: "dispatch-group-category" });
  #dispatchUnitCategory = document.createElement("li", { is: "dispatch-unit-category" });

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-dispatch-view"
    ).content;
    this.#headerElement = templateContent.firstElementChild.cloneNode(true);
    this.#listElement = templateContent.lastElementChild.cloneNode(true);
  }

  updateCategories() {
    const categories = dispatchCategoryAPI.categories;
    const dispatchCategories = categories.map((category) => {
      switch (category.type) {
        case "group": {
          const dispatchGroupCategory = this.#dispatchGroupCategory.cloneNode(true);
          dispatchGroupCategory.dataset.category = category.id;
          return dispatchGroupCategory;
        }
        case "unit": {
          const dispatchUnitCategory = this.#dispatchUnitCategory.cloneNode(true);
          dispatchUnitCategory.dataset.category = category.id;
          return dispatchUnitCategory;
        }
        default: {
          throw new Error("The category type is not valid");
        }
      }
    });
    this.#listElement.replaceChildren(...dispatchCategories);
  }

  updateGridSize() {
    const numberOfColumns = this.#listElement.children.length;
    const gridTemplateColumns = `repeat(${String(numberOfColumns)}, 296px)`;
    this.#listElement.style.gridTemplateColumns = gridTemplateColumns;
  }

  updateDispatch() {
    this.updateCategories();
    this.updateGridSize();
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchView");
      this.replaceChildren(this.#headerElement, this.#listElement);
      this.#hasBeenMountedOnce = true;
    }
    this.updateDispatch();
  }
}

export default DispatchView;
