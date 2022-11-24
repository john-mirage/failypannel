import DispatchCategory from "../dispatch-category";
import { groupIsValid } from "../../../types/dispatch-group.type";
import dispatchGroupApi from "../../../api/dispatch-group.api";

class DispatchGroupCategory extends DispatchCategory {
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
        this.updateCategoryCount();
      }
    } else {
      throw new Error("The new groups are not valid");
    }
  }

  updateCategoryGroups() {
    const dispatchGroups = this.groups.map((group) => {
      const dispatchGroup = this.#dispatchGroup.cloneNode(true);
      dispatchGroup.group = group;
      dispatchGroup.units = dispatchGroupApi.getGroupUnits(group.id);
      return dispatchGroup;
    });
    this.listElement.replaceChildren(...dispatchGroups);
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateCategoryGroups();
    this.updateCategoryCount();
  }
}

export default DispatchGroupCategory;