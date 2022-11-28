import DispatchCategory from "../dispatch-category";
import DispatchUnit from "../../dispatch-unit";

class DispatchUnitCategory extends DispatchCategory {
  #dispatchUnits;

  constructor() {
    super();
  }

  get dispatchUnits() {
    if (
      Array.isArray(this.#dispatchUnits) &&
      this.#dispatchUnits.every((dispatchUnit) => dispatchUnit instanceof DispatchUnit)
    ) {
      return this.#dispatchUnits;
    } else {
      throw new Error("The dispatch units are not valid");
    }
  }

  set dispatchUnits(newDispatchUnits) {
    if (
      Array.isArray(newDispatchUnits) &&
      newDispatchUnits.every((newDispatchUnit) => newDispatchUnit instanceof DispatchUnit)
    ) {
      this.#dispatchUnits = newDispatchUnits;
      this.updateDispatchUnits();
    } else {
      throw new Error("The new dispatch units are not valid");
    }
  }
  
  updateDispatchUnits() {
    this.listElement.replaceChildren(...this.#dispatchUnits);
    this.updateDispatchCategoryCount();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default DispatchUnitCategory;