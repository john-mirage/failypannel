import DispatchCategory from "../dispatch-category";
import DispatchGroup from "../../dispatch-group";
import { groupsAreTheSame } from "../../../types/dispatch-group.type";
import Sortable from "sortablejs";

class DispatchGroupCategory extends DispatchCategory {
  #hasBeenMountedOnce = false;
  #sortable;

  constructor() {
    super();
  }

  get dispatchGroups() {
    const dispatchGroups = [...this.listElement.children];
    if (dispatchGroups.every((dispatchGroup) => dispatchGroup instanceof DispatchGroup)) {
      return dispatchGroups;
    } else {
      throw new Error("The dispatch groups are not valid");
    }
  }

  set dispatchGroups(newDispatchGroups) {
    if (
      Array.isArray(newDispatchGroups) &&
      newDispatchGroups.every((newDispatchGroup) => newDispatchGroup instanceof DispatchGroup)
    ) {
      this.listElement.replaceChildren(...newDispatchGroups);
      this.updateDispatchCategoryCount();
    } else {
      throw new Error("The new dispatch groups are not valid");
    }
  }

  reorderDispatchGroups() {
    const dispatchGroups = this.dispatchGroups;
    if (dispatchGroups.length > 0) {
      dispatchGroups.forEach((dispatchGroup, dispatchGroupIndex) => {
        const newGroup = {
          ...dispatchGroup.group,
          categoryId: this.category.id,
          categoryOrderId: dispatchGroupIndex,
        };
        if (!groupsAreTheSame(dispatchGroup.group, newGroup)) {
          dispatchGroup.group = newGroup;
        }
      });
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#hasBeenMountedOnce) {
      this.#sortable = new Sortable(this.listElement, {
        group: `group-${this.category.id}`,
        onSort: () => {
          this.reorderDispatchGroups();
        }
      });
      this.#hasBeenMountedOnce = true;
    }
  }
}

export default DispatchGroupCategory;