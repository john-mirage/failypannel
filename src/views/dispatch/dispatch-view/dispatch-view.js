import dispatchApi from "../../../api/dispatch-api";

class DispatchView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #headerElement;
  #listElement;
  #webDispatchGroupCategory = document.createElement("li", {
    is: "dispatch-group-category",
  });
  #webDispatchUnitCategory = document.createElement("li", {
    is: "dispatch-unit-category",
  });

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-dispatch-view"
    ).content;
    this.#headerElement = templateContent.firstElementChild.cloneNode(true);
    this.#listElement = templateContent.lastElementChild.cloneNode(true);
    this.handleDispatchUpdateEvent = this.handleDispatchUpdateEvent.bind(this);
  }

  updateDispatchCategories() {
    const categories = dispatchApi.categories;
    const webDispatchCategories = categories.map((category) => {
      switch (category.type) {
        case "group": {
          const webDispatchGroupCategory =
            this.#webDispatchGroupCategory.cloneNode(true);
          webDispatchGroupCategory.category = category;
          return webDispatchGroupCategory;
        }
        case "unit": {
          const webDispatchUnitCategory =
            this.#webDispatchUnitCategory.cloneNode(true);
          webDispatchUnitCategory.category = category;
          return webDispatchUnitCategory;
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
    this.addEventListener("dispatch-update", this.handleDispatchUpdateEvent);
  }

  disconnectedCallback() {
    this.removeEventListener("dispatch-update", this.handleDispatchUpdateEvent);
  }

  handleDispatchUpdateEvent() {
    this.updateDispatch();
  }
}

export default DispatchView;
