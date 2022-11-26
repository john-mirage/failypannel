import { compareTwoNumbers } from "../../../utils/comparison";
import units from "../data/dispatch-unit.data.json";
import { unitIsValid } from "../types/dispatch-unit.type";

class DispatchUnitAPI {
  #units = new Map();

  constructor(units) {
    if (
      Array.isArray(units) &&
      units.every((unit) => unitIsValid(unit))
    ) {
      units.forEach((unit) => {
        this.#units.set(unit.id, unit);
      });
      this.compareTwoUnitsByOrderId = this.compareTwoUnitsByOrderId.bind(this);
    } else {
      throw new Error("The units are not valid");
    }
  }

  get units() {
    return [...this.#units.values()];
  }

  compareTwoUnitsByOrderId(unitA, unitB) {
    return compareTwoNumbers(unitA.parentOrderId, unitB.parentOrderId);
  }

  getUnitById(unitId) {
    if (this.#units.has(unitId)) {
      return this.#units.get(unitId);
    } else {
      throw new Error("The unit has not been found");
    }
  }

  getUnitsByCategoryId(categoryId) {
    const units = this.units.filter((unit) => {
      return unit.parentType === "category" && categoryId === unit.parentId;
    });
    return units.sort(this.compareTwoUnitsByOrderId);
  }

  getUnitsByGroupId(groupId) {
    const units = this.units.filter((unit) => {
      return unit.parentType === "group" && groupId === unit.parentId;
    });
    return units.sort(this.compareTwoUnitsByOrderId);
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