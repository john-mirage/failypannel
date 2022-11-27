import { categoryIsValid } from "../types/dispatch-category.type";

class DispatchCategoryAPI {
  static #dispatchGroupCategory = document.createElement("li", { is: "dispatch-group-category" });
  static #dispatchUnitCategory = document.createElement("li", { is: "dispatch-unit-category" });
  static #dispatchCategories = new Map();

  static get dispatchCategories() {
    return [...this.#dispatchCategories.values()];
  }

  static set dispatchCategories(newDispatchCategories) {
    if (
      Array.isArray(newDispatchCategories) &&
      newDispatchCategories.every((category) => categoryIsValid(category))
    ) {
      newDispatchCategories.forEach(this.createDispatchCategory.bind(this));
    } else {
      throw new Error("The categories are not valid");
    }
  }

  static getDispatchCategoryById(categoryId) {
    if (this.#dispatchCategories.has(categoryId)) {
      return this.#dispatchCategories.get(categoryId);
    } else {
      throw new Error("The category element has not been found");
    }
  }

  static createDispatchGroupCategory(category) {
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

  static createDispatchUnitCategory(category) {
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

  static createDispatchCategory(newCategory) {
    if (categoryIsValid(newCategory)) {
      if (!this.#dispatchCategories.has(newCategory.id)) {
        switch (newCategory.type) {
          case "group": {
            this.#dispatchCategories.set(
              newCategory.id,
              this.createDispatchGroupCategory(newCategory)
            );
            break;
          }
          case "unit": {
            this.#dispatchCategories.set(
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

  static updateDispatchCategory(newCategory) {
    if (categoryIsValid(newCategory)) {
      if (this.#dispatchCategories.has(newCategory.id)) {
        const dispatchCategory = this.#dispatchCategories.get(newCategory.id);
        dispatchCategory.category = newCategory;
      } else {
        throw new Error("The old category has not been found");
      }
    } else {
      throw new Error("The new category is not valid");
    }
  }

  static deleteDispatchCategory(categoryId) {
    if (this.#dispatchCategories.has(categoryId)) {
      this.#dispatchCategories.delete(categoryId);
    } else {
      throw new Error("The category to delete has not been found");
    }
  }
}

export default DispatchCategoryAPI;
