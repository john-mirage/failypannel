import DispatchCategory from "../dispatch-category";
import DispatchUnit from "../../dispatch-unit";
import { unitsAreTheSame } from "../../../types/dispatch-unit.type";

class DispatchUnitCategory extends DispatchCategory {
  constructor() {
    super();
  }

  get dispatchUnits() {
    const dispatchUnits = [...this.listElement.children];
    if (dispatchUnits.every((dispatchUnit) => dispatchUnit instanceof DispatchUnit)) {
      return dispatchUnits;
    } else {
      throw new Error("The dispatch units are not valid");
    }
  }

  set dispatchUnits(newDispatchUnits) {
    if (
      Array.isArray(newDispatchUnits) &&
      newDispatchUnits.every((newDispatchUnit) => newDispatchUnit instanceof DispatchUnit)
    ) {
      this.listElement.replaceChildren(...newDispatchUnits);
      this.updateDispatchCategoryCount();
    } else {
      throw new Error("The new dispatch units are not valid");
    }
  }

  reorderDispatchGroups() {
    const dispatchUnits = this.dispatchUnits;
    if (dispatchUnits.length > 0) {
      dispatchUnits.forEach((dispatchUnit, dispatchUnitIndex) => {
        const newUnit = {
          ...dispatchUnit.unit,
          parentType: "category",
          parentId: this.category.id,
          parentOrderId: dispatchUnitIndex,
        };
        if (!unitsAreTheSame(dispatchUnit.unit, newUnit)) {
          dispatchUnit.unit = newUnit;
        }
      });
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default DispatchUnitCategory;