import DispatchCategory from "../views/dispatch/dispatch-category";
import { categoryIsValid } from "../helpers/type-checkers";

class DispatchCategoryAPI {
  #categories = new Map();
  categoriesSubscribers = new Map();

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

  subscribeToCategory(dispatchCategory) {
    if (dispatchCategory instanceof DispatchCategory) {
      if (this.#categories.has(dispatchCategory.category.id)) {
        this.categoriesSubscribers.set(
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
      if (this.categoriesSubscribers.has(dispatchCategory.category.id)) {
        this.categoriesSubscribers.delete(dispatchCategory.category.id);
      } else {
        throw new Error("The dispatch category to delete has not been found");
      }
    } else {
      throw new Error("The category has not been found");
    }
  }

  dispatchCategory(categoryId) {
    if (this.#categories.has(categoryId)) {
      if (this.categoriesSubscribers.has(categoryId)) {
        const dispatchCategory = this.categoriesSubscribers.get(categoryId);
        dispatchCategory.category = this.#categories.get(categoryId);
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

  deleteCategory(categoryId) {
    if (this.#categories.has(categoryId)) {
      this.#categories.delete(categoryId);
    } else {
      throw new Error("The category to delete has not been found");
    }
  }
}

export default DispatchCategoryAPI;
