import dispatchCategories from "../data/dispatch-categories.json";
import dispatchGroups from "../data/dispatch-groups.json";
import dispatchUnits from "../data/dispatch-units.json";

class DispatchAPI {
  #categories = new Map();
  #groups = new Map();
  #units = new Map();
  #categoriesSubscribers = new Set();
  #groupsSubscribers = new Set();
  #unitsSubscribers = new Set();

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

  subscribeToCategory(webDispatchCategory) {
    this.#categoriesSubscribers.add(webDispatchCategory);
  }

  unsubscribeFromCategory(webDispatchCategory) {
    this.#categoriesSubscribers.delete(webDispatchCategory);
  }

  subscribeToGroup(webDispatchGroup) {
    this.#groupsSubscribers.add(webDispatchGroup);
  }

  unsubscribeFromGroup(webDispatchGroup) {
    this.#groupsSubscribers.delete(webDispatchGroup);
  }

  subscribeToUnit(webDispatchUnit) {
    this.#unitsSubscribers.add(webDispatchUnit);
  }

  unsubscribeFromUnit(webDispatchUnit) {
    this.#unitsSubscribers.delete(webDispatchUnit);
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
}

export default new DispatchAPI(
  dispatchCategories,
  dispatchGroups,
  dispatchUnits
);
