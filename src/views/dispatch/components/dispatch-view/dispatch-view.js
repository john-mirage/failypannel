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

  updateDispatchCategories() {
    const categories = dispatchCategoryAPI.categories;
    const webDispatchCategories = categories.map((category) => {
      switch (category.type) {
        case "group": {
          const dispatchGroupCategory = this.#dispatchGroupCategory.cloneNode(true);
          dispatchGroupCategory.category = category;
          return dispatchGroupCategory;
        }
        case "unit": {
          const dispatchUnitCategory = this.#dispatchUnitCategory.cloneNode(true);
          dispatchUnitCategory.category = category;
          return dispatchUnitCategory;
        }
        default: {
          throw new Error("The category type is not valid");
        }
      }
    });
    this.#listElement.replaceChildren(...webDispatchCategories);
    return webDispatchCategories.length;
  }

  updateDispatchGrid(numberOfColumns) {
    if (typeof numberOfColumns === "number") {
      const gridTemplateColumns = `repeat(${String(numberOfColumns)}, 296px)`;
      this.#listElement.style.gridTemplateColumns = gridTemplateColumns;
    } else {
      throw new Error("The number of columns argument is not a number");
    }
  }

  updateDispatch() {
    const count = this.updateDispatchCategories();
    this.updateDispatchGrid(count);
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
