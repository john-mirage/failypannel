import dispatchApi from "../../../api/dispatch-api";
import WebDispatchCategory from "../dispatch-category";
import { categoryIsValid } from "../../../helpers/type-checkers";

class DispatchUnitCategory extends WebDispatchCategory {
  #category;
  #webDispatchUnit = document.createElement("li", { is: "dispatch-unit" });

  constructor() {
    super();
    this.handleSortingEvent = this.handleSortingEvent.bind(this);
  }

  get category() {
    if (this.#category) {
      return this.#category;
    } else {
      throw new Error("The category is not defined");
    }
  }

  set category(newCategory) {
    if (
      categoryIsValid(newCategory)
    ) {
      this.#category = newCategory;
      if (this.isConnected) {
        this.updateCategoryUnits();
      }
    } else {
      throw new Error("The new category is not valid");
    }
  }

  updateCategoryUnits() {
    const units = dispatchApi.getCategoryUnits(this.category.id);
    const webDispatchUnits = units.map((unit) => {
      const webDispatchUnit = this.#webDispatchUnit.cloneNode(true);
      webDispatchUnit.unit = unit;
      return webDispatchUnit;
    });
    this.listElement.replaceChildren(...webDispatchUnits);
    console.log(units);
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateCategoryUnits();
    this.updateCategoryCount();
  }

  sendDispatchUpdateEvent() {
    const customEvent = new CustomEvent("dispatch-update", {
      bubbles: true,
    });
    this.dispatchEvent(customEvent);
  }

  handleSortingEvent(event) {
    if (event.from !== event.to) {
      if (this.contains(event.to)) {
        dispatchApi.updateUnit({
          ...event.item.unit,
          parentType: "category",
          parentId: this.category.id,
          parentOrderId: 0,
        });
        this.sendDispatchUpdateEvent();
      }
    }
  }
}

export default DispatchUnitCategory;
