import DispatchCategoryAPI from "./dispatch-category-api";
import dispatchGroupApi from "./dispatch-group-api";
import categories from "../data/dispatch-categories.json";

class DispatchGroupCategoryAPI extends DispatchCategoryAPI {
  #categoriesGroups = new Map();

  constructor(categories) {
    super(categories);
    this.categories.forEach((category) => {
      const categoryGroups = this.getCategoryGroups(category.id);
      this.#categoriesGroups.set(category.id, categoryGroups);
    });
  }

  getCategoryGroups(categoryId) {
    return dispatchGroupApi.groups.filter((group) => {
      return categoryId === group.categoryId;
    });
  }

  dispatchCategoryGroups(categoryId) {
    if (this.#categoriesGroups.has(categoryId)) {
      if (this.categoriesSubscribers.has(categoryId)) {
        const dispatchCategory = this.categoriesSubscribers.get(categoryId);
        dispatchCategory.groups = this.#categoriesGroups.get(categoryId);
      }
    } else {
      throw new Error("The category groups have not been found");
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
}

export default new DispatchGroupCategoryAPI(categories);