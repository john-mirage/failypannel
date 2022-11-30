import DispatchCategory from "../dispatch-category";
import DispatchUnit from "../../dispatch-unit";
import { unitsAreTheSame } from "../../../types/dispatch-unit.type";
import Sortable from "sortablejs";

class DispatchUnitCategory extends DispatchCategory {
  #hasBeenMountedOnce = false;
  #sortable;

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

  reorderDispatchUnits() {
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
    if (!this.#hasBeenMountedOnce) {
      this.#sortable = new Sortable(this.listElement, {
        group: "unit",
        onSort: () => {
          this.reorderDispatchUnits();
          this.updateDispatchCategoryCount();
        }
      });
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default DispatchUnitCategory;