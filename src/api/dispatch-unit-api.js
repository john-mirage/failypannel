import DispatchUnit from "../views/dispatch/dispatch-unit";
import units from "../data/dispatch-units.json";
import { unitIsValid } from "../helpers/type-checkers";

class DispatchUnitAPI {
  #units = new Map();
  #unitsSubscribers = new Map();

  constructor(units) {
    if (
      Array.isArray(units) &&
      units.every((unit) => unitIsValid(unit))
    ) {
      units.forEach((unit) => {
        this.#units.set(unit.id, unit);
      }); 
    } else {
      throw new Error("The units are not valid");
    }
  }

  get units() {
    return [...this.#units.values()];
  }

  subscribeToUnit(dispatchUnit) {
    if (dispatchUnit instanceof DispatchUnit) {
      if (this.#units.has(dispatchUnit.unit.id)) {
        this.#unitsSubscribers.set(dispatchUnit.unit.id, dispatchUnit);
      } else {
        throw new Error("The unit has not been found");
      }
    } else {
      throw new Error("The dispatch unit is not valid");
    }
  }

  unsubscribeToUnit(dispatchUnit) {
    if (dispatchUnit instanceof DispatchUnit) {
      if (this.#unitsSubscribers.has(dispatchUnit.unit.id)) {
        this.#unitsSubscribers.delete(dispatchUnit.unit.id);
      } else {
        throw new Error("The dispatch unit to delete has not been found");
      }
    } else {
      throw new Error("The unit has not been found");
    }
  }
}

export default new DispatchUnitAPI(units);