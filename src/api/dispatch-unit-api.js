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
}

export default new DispatchUnitAPI(units);