import { compareTwoNumbers } from "../../../utils/comparison";
import { unitIsValid } from "../types/dispatch-unit.type";

class DispatchUnitAPI {
  #dispatchUnit = document.createElement("li", { is: "dispatch-unit" });
  #dispatchUnitMap = new Map();

  constructor(units) {
    if (
      Array.isArray(units) &&
      units.every((unit) => unitIsValid(unit))
    ) {
      this.compareTwoDispatchUnitsByOrderId = this.compareTwoDispatchUnitsByOrderId.bind(this);
      this.createDispatchUnit = this.createDispatchUnit.bind(this);
      units.forEach(this.createDispatchUnit);
    } else {
      throw new Error("The units are not valid");
    }
  }

  get dispatchUnitMap() {
    return this.#dispatchUnitMap;
  }

  get dispatchUnitArray() {
    return [...this.#dispatchUnitMap.values()];
  }

  compareTwoDispatchUnitsByOrderId(dispatchUnitA, dispatchUnitB) {
    return compareTwoNumbers(
      dispatchUnitA.unit.parentOrderId,
      dispatchUnitB.unit.parentOrderId
    );
  }

  getDispatchUnitById(unitId) {
    if (this.#dispatchUnitMap.has(unitId)) {
      return this.#dispatchUnitMap.get(unitId);
    } else {
      throw new Error("The dispatch unit has not been found");
    }
  }

  getDispatchUnitsByCategoryId(categoryId) {
    const dispatchUnits = this.dispatchUnitArray.filter((dispatchUnit) => {
      return (
        dispatchUnit.unit.parentType === "category" && 
        dispatchUnit.unit.parentId === categoryId
      );
    });
    dispatchUnits.sort(this.compareTwoDispatchUnitsByOrderId);
    return dispatchUnits;
  }

  getDispatchUnitsByGroupId(groupId) {
    const dispatchUnits = this.dispatchUnitArray.filter((dispatchUnit) => {
      return (
        dispatchUnit.unit.parentType === "group" &&
        dispatchUnit.unit.parentId === groupId
      );
    });
    dispatchUnits.sort(this.compareTwoDispatchUnitsByOrderId);
    return dispatchUnits;
  }

  createDispatchUnit(newUnit) {
    if (unitIsValid(newUnit)) {
      if (!this.#dispatchUnitMap.has(newUnit.id)) {
        const dispatchUnit = this.#dispatchUnit.cloneNode(true);
        dispatchUnit.unit = newUnit;
        this.#dispatchUnitMap.set(newUnit.id, dispatchUnit);
      } else {
        throw new Error("The dispatch unit already exist");
      }
    } else {
      throw new Error("The new unit is not valid");
    }
  }

  updateDispatchUnit(newUnit) {
    if (unitIsValid(newUnit)) {
      if (this.#dispatchUnitMap.has(newUnit.id)) {
        const dispatchUnit = this.#dispatchUnitMap.get(newUnit.id);
        dispatchUnit.unit = newUnit;
      } else {
        throw new Error("The old dispatch unit has not been found");
      }
    } else {
      throw new Error("The new unit is not valid");
    }
  }

  deleteDispatchUnit(unitId) {
    if (this.#dispatchUnitMap.has(unitId)) {
      this.#dispatchUnitMap.delete(unitId);
    } else {
      throw new Error("The dispatch unit has not been found");
    }
  }
}

export default DispatchUnitAPI;