import DispatchCategoryAPI from "./dispatch-category-api";
import dispatchUnitApi from "./dispatch-unit-api";
import categories from "../data/dispatch-categories.json";

class DispatchUnitCategoryAPI extends DispatchCategoryAPI {
  #categoriesUnits = new Map();

  constructor(categories) {
    super(categories);
    this.categories.forEach((category) => {
      const categoryUnits = this.getCategoryUnits(category.id);
      this.#categoriesUnits.set(category.id, categoryUnits);
    });
  }

  getCategoryUnits(categoryId) {
    return dispatchUnitApi.units.filter((unit) => {
      return categoryId === unit.parentId;
    });
  }

  dispatchCategoryUnits(categoryId) {
    if (this.#categoriesUnits.has(categoryId)) {
      if (this.categoriesSubscribers.has(categoryId)) {
        const dispatchCategory = this.categoriesSubscribers.get(categoryId);
        dispatchCategory.units = this.#categoriesUnits.get(categoryId);
      }
    } else {
      throw new Error("The category units have not been found");
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
}

export default new DispatchUnitCategoryAPI(categories);