import DispatchUnit from "../components/dispatch-unit";
import units from "../data/dispatch-unit.data.json";
import { unitIsValid } from "../types/dispatch-unit.type";

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
      console.log("dispatch unit");
    } else {
      throw new Error("The units are not valid");
    }
  }

  get units() {
    return [...this.#units.values()];
  }

  getUnit(unitId) {
    if (this.#units.has(unitId)) {
      return this.#units.get(unitId);
    } else {
      throw new Error("The unit has not been found");
    }
  }

  hasUnit(unitId) {
    return this.#units.has(unitId);
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

  dispatchUnit(unitId) {
    if (this.#units.has(unitId)) {
      if (this.#unitsSubscribers.has(unitId)) {
        const dispatchUnit = this.#unitsSubscribers.get(unitId);
        dispatchUnit.unit = this.#units.get(unitId);
      }
    } else {
      throw new Error("The unit has not been found");
    }
  }

  addUnit(newUnit) {
    if (unitIsValid(newUnit)) {
      if (!this.#units.has(newUnit.id)) {
        this.#units.set(newUnit.id, newUnit);
      } else {
        throw new Error("The unit already exist");
      }
    } else {
      throw new Error("The new unit is not valid");
    }
  }

  updateUnit(newUnit) {
    if (unitIsValid(newUnit)) {
      if (this.#units.has(newUnit.id)) {
        this.#units.set(newUnit.id, newUnit);
        this.dispatchUnit(newUnit.id);
      } else {
        throw new Error("The old unit has not been found");
      }
    } else {
      throw new Error("The new unit is not valid");
    }
  }

  deleteUnit(unitId) {
    if (this.#units.has(unitId)) {
      this.#units.delete(unitId);
    } else {
      throw new Error("The unit to delete has not been found");
    }
  }
}

export default new DispatchUnitAPI(units);