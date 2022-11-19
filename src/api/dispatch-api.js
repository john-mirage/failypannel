import dispatchCategories from "../data/dispatch-categories.json";
import dispatchGroups from "../data/dispatch-groups.json";
import dispatchUnits from "../data/dispatch-units.json";
import { unitIsValid } from "../helpers/type-checkers";

class DispatchAPI {
  #categories = new Map();
  #groups = new Map();
  #units = new Map();

  constructor(categories, groups, units) {
    categories.forEach((category) => {
      this.#categories.set(category.id, category);
    });
    groups.forEach((group) => {
      this.#groups.set(group.id, group);
    });
    units.forEach((unit) => {
      this.#units.set(unit.id, unit);
    });
  }

  get categories() {
    return [...this.#categories.values()];
  }

  get groups() {
    return [...this.#groups.values()];
  }

  get units() {
    return [...this.#units.values()];
  }

  getCategoryById(categoryId) {
    if (typeof categoryId === "string") {
      const category = this.#categories.get(categoryId);
      if (category) {
        return category;
      } else {
        throw new Error("The category has not been found");
      }
    } else {
      throw new Error("The category id is not a string");
    }
  }

  compareTwoStrings(stringA, stringB) {
    if (typeof stringA === "string" && typeof stringB === "string") {
      const formatedStringA = stringA.toUpperCase();
      const formatedStringB = stringB.toUpperCase();
      if (formatedStringA < formatedStringB) {
        return -1;
      }
      if (formatedStringA > formatedStringB) {
        return 1;
      }
      return 0;
    } else {
      throw new Error("The two arguments are not strings");
    }
  }

  compareTwoGroupsByOrderId(groupA, groupB) {
    return this.compareTwoStrings(
      groupA.categoryOrderId,
      groupB.categoryOrderId
    );
  }

  compareTwoUnitsByOrderId(unitA, unitB) {
    if (
      unitA.hasCategory &&
      !unitA.hasGroup &&
      unitB.hasCategory &&
      !unitB.hasGroup
    ) {
      return this.compareTwoStrings(
        unitA.categoryOrderId,
        unitB.categoryOrderId
      );
    }
    if (
      unitA.hasGroup &&
      !unitA.hasCategory &&
      unitB.hasGroup &&
      !unitB.hasCategory
    ) {
      return this.compareTwoStrings(unitA.groupOrderId, unitB.groupOrderId);
    }
    throw new Error("Can't compare the two units, there are different");
  }

  getCategoryGroups(categoryId) {
    if (typeof categoryId === "string") {
      const category = this.#categories.get(categoryId);
      const groups = this.groups.filter(
        (group) => group.categoryId === category.id
      );
      return groups.sort(this.compareTwoGroupsByOrderId);
    } else {
      throw new Error("The category id is not a string");
    }
  }

  getCategoryUnits(categoryId) {
    if (typeof categoryId === "string") {
      const category = this.#categories.get(categoryId);
      const units = this.units.filter(
        (unit) => unit.categoryId === category.id
      );
      return units.sort(this.compareTwoUnitsByOrderId);
    } else {
      throw new Error("The category id is not a string");
    }
  }

  getGroupUnits(groupId) {
    if (typeof groupId === "string") {
      const group = this.#groups.get(groupId);
      const units = this.units.filter((unit) => unit.groupId === group.id);
      return units.sort(this.compareTwoUnitsByOrderId);
    } else {
      throw new Error("The group id is not a string");
    }
  }

  updateUnit(newUnit) {
    if (unitIsValid(newUnit)) {
      this.#units.set(newUnit.id, newUnit);
    } else {
      throw new Error("The new unit is not valid");
    }
  }

  deleteGroup(groupId) {
    if (typeof groupId === "string") {
      if (this.#groups.has(groupId)) {
        this.#groups.delete(groupId);
      } else {
        throw new Error("The group to delete has not been found");
      }
    } else {
      throw new Error("The group id is not a string");
    }
  }
}

export default new DispatchAPI(
  dispatchCategories,
  dispatchGroups,
  dispatchUnits
);
