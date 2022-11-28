import { categoryIsValid } from "../types/dispatch-category.type";

class DispatchCategoryAPI {
  #dispatchGroupCategory = document.createElement("li", { is: "dispatch-group-category" });
  #dispatchUnitCategory = document.createElement("li", { is: "dispatch-unit-category" });
  #dispatchCategoryMap = new Map();

  constructor(categories) {
    if (
      Array.isArray(categories) &&
      categories.every((category) => categoryIsValid(category))
    ) {
      this.createDispatchCategory = this.createDispatchCategory.bind(this);
      categories.forEach(this.createDispatchCategory);
    } else {
      throw new Error("The categories are not valid");
    }
  }

  get dispatchCategoryMap() {
    return this.#dispatchCategoryMap;
  }

  get dispatchCategoryArray() {
    return [...this.#dispatchCategoryMap.values()];
  }

  getDispatchCategoryById(categoryId) {
    if (this.#dispatchCategoryMap.has(categoryId)) {
      return this.#dispatchCategoryMap.get(categoryId);
    } else {
      throw new Error("The category element has not been found");
    }
  }

  createDispatchGroupCategory(category) {
    if (categoryIsValid(category)) {
      if (category.type === "group") {
        const dispatchCategory = this.#dispatchGroupCategory.cloneNode(true);
        dispatchCategory.category = category;
        return dispatchCategory;
      } else {
        throw new Error("The category type is not valid");
      }
    } else {
      throw new Error("The category is not valid");
    }
  }

  createDispatchUnitCategory(category) {
    if (categoryIsValid(category)) {
      if (category.type === "unit") {
        const dispatchCategory = this.#dispatchUnitCategory.cloneNode(true);
        dispatchCategory.category = category;
        return dispatchCategory;
      } else {
        throw new Error("The category type is not valid");
      }
    } else {
      throw new Error("The category is not valid");
    }
  }

  createDispatchCategory(newCategory) {
    if (categoryIsValid(newCategory)) {
      if (!this.#dispatchCategoryMap.has(newCategory.id)) {
        switch (newCategory.type) {
          case "group": {
            this.#dispatchCategoryMap.set(
              newCategory.id,
              this.createDispatchGroupCategory(newCategory)
            );
            break;
          }
          case "unit": {
            this.#dispatchCategoryMap.set(
              newCategory.id,
              this.createDispatchUnitCategory(newCategory)
            );
            break;
          }
          default: {
            throw new Error("The category type is not valid");
          }
        }
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
