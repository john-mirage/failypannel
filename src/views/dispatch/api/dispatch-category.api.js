import categories from "../data/dispatch-category.data.json";
import { categoryIsValid } from "../types/dispatch-category.type";

class DispatchCategoryAPI {
  #categories = new Map();

  constructor(categories) {
    if (
      Array.isArray(categories) &&
      categories.every((category) => categoryIsValid(category))
    ) {
      categories.forEach((category) => {
        this.#categories.set(category.id, category);
      });
    } else {
      throw new Error("The categories are not valid");
    }
  }

  get categories() {
    return [...this.#categories.values()];
  }

  getCategoryById(categoryId) {
    if (this.#categories.has(categoryId)) {
      return this.#categories.get(categoryId);
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

  deleteCategory(categoryId) {
    if (this.#categories.has(categoryId)) {
      this.#categories.delete(categoryId);
    } else {
      throw new Error("The category to delete has not been found");
    }
  }
}

export default new DispatchCategoryAPI(categories);
