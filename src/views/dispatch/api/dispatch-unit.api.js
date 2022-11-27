import { compareTwoNumbers } from "../../../utils/comparison";
import { unitIsValid } from "../types/dispatch-unit.type";
import DispatchUnitCategory from "../components/dispatch-category/dispatch-unit-category";
import DispatchGroup from "../components/dispatch-group/dispatch-group";

class DispatchUnitAPI {
  static #dispatchUnit = document.createElement("li", { is: "dispatch-unit" });
  static #dispatchUnits = new Map();

  static get dispatchUnits() {
    return [...this.#dispatchUnits.values()];
  }

  static set dispatchUnits(newUnits) {
    if (
      Array.isArray(newUnits) &&
      newUnits.every((unit) => unitIsValid(unit))
    ) {
      newUnits.forEach(this.createDispatchUnit.bind(this));
    } else {
      throw new Error("The units are not valid");
    }
  }

  static compareTwoDispatchUnitsByOrderId(dispatchUnitA, dispatchUnitB) {
    return compareTwoNumbers(
      dispatchUnitA.unit.parentOrderId,
      dispatchUnitB.unit.parentOrderId
    );
  }

  static getDispatchUnitById(unitId) {
    if (this.#dispatchUnits.has(unitId)) {
      return this.#dispatchUnits.get(unitId);
    } else {
      throw new Error("The dispatch unit has not been found");
    }
  }

  static getDispatchUnitsByCategoryId(categoryId) {
    const dispatchUnits = this.dispatchUnits.filter((dispatchUnit) => {
      return (
        dispatchUnit.unit.parentType === "category" && 
        dispatchUnit.unit.parentId === categoryId
      );
    });
    dispatchUnits.sort(this.compareTwoDispatchUnitsByOrderId.bind(this));
    return dispatchUnits;
  }

  static getDispatchUnitsByGroupId(groupId) {
    const units = this.dispatchUnits.filter((dispatchUnit) => {
      return (
        dispatchUnit.unit.parentType === "group" &&
        dispatchUnit.unit.parentId === groupId
      );
    });
    units.sort(this.compareTwoDispatchUnitsByOrderId.bind(this));
    return units;
  }

  static createDispatchUnit(newUnit) {
    if (unitIsValid(newUnit)) {
      if (!this.#dispatchUnits.has(newUnit.id)) {
        const dispatchUnit = this.#dispatchUnit.cloneNode(true);
        dispatchUnit.unit = newUnit;
        this.#dispatchUnits.set(newUnit.id, dispatchUnit);
      } else {
        throw new Error("The dispatch unit already exist");
      }
    } else {
      throw new Error("The new unit is not valid");
    }
  }

  static updateDispatchUnit(newUnit) {
    if (unitIsValid(newUnit)) {
      if (this.#dispatchUnits.has(newUnit.id)) {
        const dispatchUnit = this.#dispatchUnits.get(newUnit.id);
        dispatchUnit.unit = newUnit;
      } else {
        throw new Error("The old dispatch unit has not been found");
      }
    } else {
      throw new Error("The new unit is not valid");
    }
  }

  static updateDispatchUnitsCategory(dispatchUnitCategory) {
    if (dispatchUnitCategory instanceof DispatchUnitCategory) {
      const dispatchUnits = [...dispatchUnitCategory.listElement.children];
      if (dispatchUnits.length > 0) {
        dispatchUnits.forEach((dispatchUnit, dispatchUnitIndex) => {
          this.updateDispatchUnit({
            ...dispatchUnit.unit,
            parentType: "category",
            parentId: dispatchUnitCategory.category.id,
            parentOrderId: dispatchUnitIndex,
          });
        });
      }
    } else {
      throw new Error("The dispatch category is not valid");
    }
  }

  static updateDispatchUnitsGroup(dispatchGroup) {
    if (dispatchGroup instanceof DispatchGroup) {
      const dispatchUnits = [...dispatchGroup.listElement.children];
      if (dispatchUnits.length > 0) {
        dispatchUnits.forEach((dispatchUnit, dispatchUnitIndex) => {
          this.updateDispatchUnit({
            ...dispatchUnit.unit,
            parentType: "group",
            parentId: dispatchGroup.group.categoryId,
            parentOrderId: dispatchUnitIndex,
          });
        });
      }
    } else {
      throw new Error("The dispatch group is not valid");
    }
  }

  static deleteDispatchUnit(unitId) {
    if (this.#dispatchUnits.has(unitId)) {
      this.#dispatchUnits.delete(unitId);
    } else {
      throw new Error("The dispatch unit has not been found");
    }
  }
}

export default DispatchUnitAPI;