import dispatchApi from "../../../api/dispatch-api";
import WebDispatchCategory from "../dispatch-category";
import { groupIsValid } from "../../../helpers/type-checkers";

class DispatchGroupCategory extends WebDispatchCategory {
  #groups;
  #dispatchGroup = document.createElement("li", { is: "dispatch-group" });

  constructor() {
    super();
  }

  get groups() {
    if (this.#groups) {
      return this.#groups;
    } else {
      throw new Error("The groups are not defined");
    }
  }

  set groups(newGroups) {
    if (
      Array.isArray(newGroups) &&
      newGroups.every((newGroup) => groupIsValid(newGroup))
    ) {
      this.#groups = newGroups;
      if (this.isConnected) {
        this.updateCategoryGroups();
      }
    } else {
      throw new Error("The new groups are not valid");
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
