import dispatchCategories from "../data/dispatch-categories.json";
import dispatchGroups from "../data/dispatch-groups.json";
import dispatchUnits from "../data/dispatch-units.json";

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

  getCategoryGroups(categoryId) {
    const category = this.#categories.get(categoryId);
    return this.groups.filter((group) => group.categoryId === category.id);
  }

  getCategoryUnits(categoryId) {
    const category = this.#categories.get(categoryId);
    return this.units.filter((unit) => unit.categoryId === category.id);
  }

  getGroupUnits(groupId) {
    const group = this.#groups.get(groupId);
    return this.units.filter((unit) => unit.groupId === group.id);
  }

  updateUnit(newUnit) {
    this.#units.set(newUnit.id, newUnit);
  }

  deleteGroup(groupId) {
    this.#groups.delete(groupId);
  }
}

export default new DispatchAPI(
  dispatchCategories,
  dispatchGroups,
  dispatchUnits
);
