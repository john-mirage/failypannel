import DispatchCategory from "../components/dispatch-category/dispatch-category";
import { categoryIsValid } from "../types/dispatch-category.type";

class DispatchCategoryAPI {
  #dispatchCategoryMap = new Map();
  #dispatchCategory;
  #categories;

  constructor(categories, dispatchCategory) {
    this.createDispatchCategory = this.createDispatchCategory.bind(this);
    if (dispatchCategory instanceof DispatchCategory) {
      this.#dispatchCategory = dispatchCategory;
    } else {
      throw new Error("The dispatch category is not valid");
    }
    if (this.categoriesAreValid(categories)) { 
      this.categories = categories;
    } else {
      throw new Error("The categories are not valid");
    }
  }

  get dispatchCategoryArray() {
    return [...this.#dispatchCategoryMap.values()];
  }

  get dispatchCategoryMap() {
    return this.#dispatchCategoryMap;
  }

  get categories() {
    return this.#categories;
  }

  set categories(newCategories) {
    if (this.categoriesAreValid(newCategories)) {
      this.#categories = newCategories;
      this.#categories.forEach(this.createDispatchCategory);
    } else {
      throw new Error("The new categories are not valid");
    }
  }

  categoriesAreValid(categories) {
    return (
      Array.isArray(categories) &&
      categories.every((category) => categoryIsValid(category))
    );
  }

  getDispatchCategoryById(categoryId) {
    if (this.#dispatchCategoryMap.has(categoryId)) {
      return this.#dispatchCategoryMap.get(categoryId);
    } else {
      throw new Error("The category element has not been found");
    }
  }

  createDispatchCategory(newCategory) {
    if (categoryIsValid(newCategory)) {
      if (!this.#dispatchCategoryMap.has(newCategory.id)) {
        const dispatchCategory = this.#dispatchCategory.cloneNode(true);
        dispatchCategory.category = newCategory;
        this.#dispatchCategoryMap.set(newCategory.id, dispatchCategory);
      } else {
        throw new Error("The dispatch category already exist");
      }
    } else {
      throw new Error("The new category is not valid");
    }
  }

  updateDispatchCategory(newCategory) {
    if (categoryIsValid(newCategory)) {
      if (this.#dispatchCategoryMap.has(newCategory.id)) {
        const dispatchCategory = this.#dispatchCategoryMap.get(newCategory.id);
        dispatchCategory.category = newCategory;
      } else {
        throw new Error("The old category has not been found");
      }
    } else {
      throw new Error("The new category is not valid");
    }
  }

  deleteDispatchCategory(categoryId) {
    if (this.#dispatchCategoryMap.has(categoryId)) {
      this.#dispatchCategoryMap.delete(categoryId);
    } else {
      throw new Error("The category to delete has not been found");
    }
  }
}

export default DispatchCategoryAPI;
