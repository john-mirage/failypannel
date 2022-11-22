import dispatchApi from "../../../api/dispatch-api";
import WebDispatchCategory from "../dispatch-category";
import { categoryIsValid } from "../../../helpers/type-checkers";

class DispatchGroupCategory extends WebDispatchCategory {
  #category;
  #dispatchGroup = document.createElement("li", { is: "dispatch-group" });

  constructor() {
    super();
  }

  get category() {
    if (this.#category) {
      return this.#category;
    } else {
      throw new Error("The category is not defined");
    }
  }

  set category(newCategory) {
    if (
      categoryIsValid(newCategory)
    ) {
      this.#category = newCategory;
      if (this.isConnected) {
        this.updateCategoryUnits();
      }
    } else {
      throw new Error("The new category is not valid");
    }
  }

  updateCategoryGroups() {
    const groups = dispatchApi.getCategoryGroups(this.category.id);
    const webDispatchGroups = groups.map((group) => {
      const webDispatchGroup = this.#dispatchGroup.cloneNode(true);
      webDispatchGroup.group = group;
      return webDispatchGroup;
    });
    this.listElement.replaceChildren(...webDispatchGroups);
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateCategoryGroups();
    this.updateCategoryCount();
  }
}

export default DispatchGroupCategory;
