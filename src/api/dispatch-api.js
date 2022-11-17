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

  /*
  dispatch(propertyName) {
    switch (propertyName) {
      case "jobs":
        this.#jobsSubscribers.forEach((jobsSubscriber) => {
          jobsSubscriber.jobs = this.jobs;
        });
        break;
      case "jobFilters":
        this.#jobFiltersSubscribers.forEach((jobFiltersSubscriber) => {
          jobFiltersSubscriber.jobFilters = this.jobFilters;
        });
        break;
      default:
        throw new Error("The property name is not valid");
    }
  }
  */

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

  getCategoryById(categoryId) {
    const category = this.#categories.get(categoryId);
    if (category) {
      return category;
    } else {
      throw new Error("The category has not been found");
    }
  }

  getCategoryCards(categoryId) {
    const category = this.#categories.get(categoryId);
    switch (category.type) {
      case "group": {
        return this.groups.filter((group) => group.categoryId === category.id);
      }
      case "unit": {
        return this.units.filter((unit) => unit.categoryId === category.id);
      }
      default: {
        throw new Error("The category type is not valid");
      }
    }
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
