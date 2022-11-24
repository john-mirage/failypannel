import DispatchCategory from "../dispatch-category";
import { unitIsValid } from "../../../types/dispatch-unit.type";

class DispatchUnitCategory extends DispatchCategory {
  #units;
  #dispatchUnit = document.createElement("li", { is: "dispatch-unit" });

  constructor() {
    super();
  }

  get units() {
    if (this.#units) {
      return this.#units;
    } else {
      throw new Error("The units are not defined");
    }
  }

  set units(newUnits) {
    if (
      Array.isArray(newUnits) &&
      newUnits.every((newUnit) => unitIsValid(newUnit))
    ) {
      this.#units = newUnits;
      if (this.isConnected) {
        this.updateCategoryUnits();
        this.updateCategoryCount();
      }
    } else {
      throw new Error("The new units are not valid");
    }
  }

  updateCategoryUnits() {
    const webDispatchUnits = this.units.map((unit) => {
      const webDispatchUnit = this.#dispatchUnit.cloneNode(true);
      webDispatchUnit.unit = unit;
      return webDispatchUnit;
    });
    this.listElement.replaceChildren(...webDispatchUnits);
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateCategoryUnits();
    this.updateCategoryCount();
  }
}

export default DispatchUnitCategory;