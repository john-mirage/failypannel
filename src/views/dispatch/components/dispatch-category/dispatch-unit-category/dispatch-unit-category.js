import DispatchCategory from "../dispatch-category";
import dispatchUnitApi from "../../../api/dispatch-unit.api";

class DispatchUnitCategory extends DispatchCategory {
  #dispatchUnit = document.createElement("li", { is: "dispatch-unit" });

  constructor() {
    super();
  }

  updateCategoryUnits() {
    if (typeof this.category === "string") {
      const units = dispatchUnitApi.getUnitsByCategoryId(this.category);
      const dispatchUnits = units.map((unit) => {
        const dispatchUnit = this.#dispatchUnit.cloneNode(true);
        dispatchUnit.dataset.unit = unit.id;
        return dispatchUnit;
      });
      this.listElement.replaceChildren(...dispatchUnits);
    } else {
      throw new Error("The category is not defined");
    }
  }

  reorderCategoryUnits() {
    if (typeof this.category === "string") {
      const dispatchUnits = [...this.listElement.children];
      dispatchUnits.forEach((dispatchUnit, dispatchUnitIndex) => {
        const unit = dispatchUnitApi.getUnitById(dispatchUnit.unit);
        dispatchUnitApi.updateUnit({
          ...unit,
          parentType: "category",
          parentId: this.category,
          parentOrderId: dispatchUnitIndex,
        });
      });
    } else {
      throw new Error("The category is not defined");
    }
  }

  updateCategory() {
    super.updateCategory();
    this.updateCategoryUnits();
    this.updateCategoryCount();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default DispatchUnitCategory;