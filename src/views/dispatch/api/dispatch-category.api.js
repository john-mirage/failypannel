import { DispatchCategory } from "../components/dispatch-category";
import dispatchGroupAPI from "./dispatch-group.api";
import dispatchUnitAPI from "./dispatch-unit.api";
import { categoryIsValid } from "../types/dispatch-category.type";
import categories from "../data/dispatch-category.data.json";
import { compareTwoNumbers } from "../../../utils/comparison";

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
        this.#categories.set(category.id, category);
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
      });
      this.compareTwoGroupsByOrderId = this.compareTwoGroupsByOrderId.bind(this);
      this.compareTwoUnitsByOrderId = this.compareTwoUnitsByOrderId.bind(this);
      console.log("dispatch category");
    } else {
      throw new Error("The categories are not valid");
    }
  }

  get categories() {
    return [...this.#categories.values()];
  }

  compareTwoGroupsByOrderId(groupA, groupB) {
    return compareTwoNumbers(groupA.categoryOrderId, groupB.categoryOrderId);
  }

  compareTwoUnitsByOrderId(unitA, unitB) {
    return compareTwoNumbers(unitA.parentOrderId, unitB.parentOrderId);
  }

  getCategory(categoryId) {
    if (this.#categories.has(categoryId)) {
      return this.#categories.get(categoryId);
    } else {
      throw new Error("The category has not been found");
    }
  }

  getCategoryGroups(categoryId) {
    const groups = dispatchGroupAPI.groups.filter((group) => {
      return categoryId === group.categoryId;
    });
    return groups.sort(this.compareTwoGroupsByOrderId);
  }

  getCategoryUnits(categoryId) {
    const units = dispatchUnitAPI.units.filter((unit) => {
      return unit.parentType === "category" && categoryId === unit.parentId;
    });
    return units.sort(this.compareTwoUnitsByOrderId);
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

  reorderCategoryUnits(categoryId, unitIds) {
    if (
      this.#categories.has(categoryId) &&
      Array.isArray(unitIds) &&
      unitIds.every((unitId) => dispatchUnitAPI.hasUnit(unitId))
    ) {
      const category = this.#categories.get(categoryId);
      if (category.type === "unit") {
        unitIds.forEach((unitId, unitIdIndex) => {
          const unit = dispatchUnitAPI.getUnit(unitId);
          if (
            category.type === unit.parentType &&
            category.id === unit.parentId
          ) {
            if (unit.parentOrderId !== unitIdIndex) {
              unit.parentOrderId = unitIdIndex;
            }
          } else {
            throw new Error("The unit does not belong to the category");
          }
        });
      } else {
        throw new Error("The category type is not valid");
      }
    } else {
      throw new Error("The category and units have not been found");
    }
  }

  getCategoryUnitLastIndex(categoryId) {
    if (this.#categories.has(categoryId)) {
      const category = this.#categories.get(categoryId);
      if (category.type === "unit") {
        const units = this.getCategoryUnits(category.id);
        return units.reduce(
          (lastIndex, unit) =>
            unit.parentOrderId > lastIndex ? unit.parentOrderId : lastIndex,
          0
        );
      } else {
        throw new Error("The category type is not unit");
      }
    } else {
      throw new Error("The category has not been found");
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
