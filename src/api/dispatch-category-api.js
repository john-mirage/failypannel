import DispatchCategory from "../views/dispatch/dispatch-category";
import dispatchGroupApi from "./dispatch-group-api";
import dispatchUnitApi from "./dispatch-unit-api";
import { categoryIsValid } from "../helpers/type-checkers";
import categories from "../data/dispatch-categories.json";

class DispatchCategoryAPI {
  #categories = new Map();
  #categoriesGroups = new Map();
  #categoriesUnits = new Map();
  #categoriesSubscribers = new Map();

  constructor(categories) {
    if (
      Array.isArray(categories) &&
      categories.every((category) => categoryIsValid(category))
    ) {
      categories.forEach((category) => {
        switch (category.type) {
          case "group": {
            const categoryGroups = this.getCategoryGroups(category.id);
            this.#categoriesGroups.set(category.id, categoryGroups);
            break;
          }
          case "unit": {
            const categoryUnits = this.getCategoryUnits(category.id);
            this.#categoriesUnits.set(category.id, categoryUnits);
            break;
          }
          default: {
            throw new Error("The category type is not valid");
          }
        }
        this.#categories.set(category.id, category);
      });
    } else {
      throw new Error("The categories are not valid");
    }
  }

  get categories() {
    return [...this.#categories.values()];
  }

  getCategoryGroups(categoryId) {
    return dispatchGroupApi.groups.filter((group) => {
      return categoryId === group.categoryId;
    });
  }

  getCategoryUnits(categoryId) {
    return dispatchUnitApi.units.filter((unit) => {
      return categoryId === unit.parentId;
    });
  }

  subscribeToCategory(dispatchCategory) {
    if (dispatchCategory instanceof DispatchCategory) {
      if (this.#categories.has(dispatchCategory.category.id)) {
        this.#categoriesSubscribers.set(
          dispatchCategory.category.id,
          dispatchCategory
        );
      } else {
        throw new Error("The category has not been found");
      }
    } else {
      throw new Error("The dispatch category is not valid");
    }
  }

  unsubscribeToCategory(dispatchCategory) {
    if (dispatchCategory instanceof DispatchCategory) {
      if (this.#categoriesSubscribers.has(dispatchCategory.category.id)) {
        this.#categoriesSubscribers.delete(dispatchCategory.category.id);
      } else {
        throw new Error("The dispatch category to delete has not been found");
      }
    } else {
      throw new Error("The category has not been found");
    }
  }

  dispatchCategory(categoryId) {
    if (this.#categories.has(categoryId)) {
      if (this.#categoriesSubscribers.has(categoryId)) {
        const dispatchCategory = this.#categoriesSubscribers.get(categoryId);
        dispatchCategory.category = this.#categories.get(categoryId);
      }
    } else {
      throw new Error("The category has not been found");
    }
  }

  dispatchCategoryGroups(categoryId) {
    if (this.#categoriesGroups.has(categoryId)) {
      if (this.#categoriesSubscribers.has(categoryId)) {
        const dispatchCategory = this.#categoriesSubscribers.get(categoryId);
        dispatchCategory.groups = this.#categoriesGroups.get(categoryId);
      }
    } else {
      throw new Error("The category groups have not been found");
    }
  }

  dispatchCategoryUnits(categoryId) {
    if (this.#categoriesUnits.has(categoryId)) {
      if (this.#categoriesSubscribers.has(categoryId)) {
        const dispatchCategory = this.#categoriesSubscribers.get(categoryId);
        dispatchCategory.units = this.#categoriesUnits.get(categoryId);
      }
    } else {
      throw new Error("The category units have not been found");
    }
  }

  addCategory(newCategory) {
    if (categoryIsValid(newCategory)) {
      if (!this.#categories.has(newCategory.id)) {
        this.#categories.set(newCategory.id, newCategory);
      } else {
        throw new Error("The category already exist");
      }
    } else {
      throw new Error("The new category is not valid");
    }
  }

  updateCategory(newCategory) {
    if (categoryIsValid(newCategory)) {
      if (this.#categories.has(newCategory.id)) {
        this.#categories.set(newCategory.id, newCategory);
        this.dispatchCategory(newCategory.id);
      } else {
        throw new Error("The old category has not been found");
      }
    } else {
      throw new Error("The new category is not valid");
    }
  }

  updateCategoryGroups(categoryId) {
    if (this.#categoriesGroups.has(categoryId)) {
      const categoryGroups = this.getCategoryGroups(categoryId);
      this.#categoriesGroups.set(categoryId, categoryGroups);
      this.dispatchCategoryGroups(categoryId);
    } else {
      throw new Error("The old category groups have not been found");
    }
  }

  updateCategoryUnits(categoryId) {
    if (this.#categoriesUnits.has(categoryId)) {
      const categoryUnits = this.getCategoryUnits(categoryId);
      this.#categoriesUnits.set(categoryId, categoryUnits);
      this.dispatchCategoryUnits(categoryId);
    } else {
      throw new Error("The old category units have not been found");
    }
  }

  deleteCategory(categoryId) {
    if (this.#categories.has(categoryId)) {
      this.#categories.delete(categoryId);
    } else {
      throw new Error("The category to delete has not been found");
    }
  }
}

export default new DispatchCategoryAPI(categories);
