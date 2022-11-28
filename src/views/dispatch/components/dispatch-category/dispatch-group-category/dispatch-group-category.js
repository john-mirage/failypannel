import DispatchCategory from "../dispatch-category";
import DispatchGroup from "../../dispatch-group";

class DispatchGroupCategory extends DispatchCategory {
  #dispatchGroups;

  constructor() {
    super();
  }

  get dispatchGroups() {
    if (
      Array.isArray(this.#dispatchGroups) &&
      this.#dispatchGroups.every((dispatchGroup) => dispatchGroup instanceof DispatchGroup)
    ) {
      return this.#dispatchGroups;
    } else {
      throw new Error("The dispatch groups are not valid");
    }
  }

  set dispatchGroups(newDispatchGroups) {
    if (
      Array.isArray(newDispatchGroups) &&
      newDispatchGroups.every((newDispatchGroup) => newDispatchGroup instanceof DispatchGroup)
    ) {
      this.#dispatchGroups = newDispatchGroups;
      this.updateDispatchGroups();
    } else {
      throw new Error("The new dispatch groups are not valid");
    }
  }

  updateDispatchGroups() {
    this.listElement.replaceChildren(...this.#dispatchGroups);
    this.updateDispatchCategoryCount();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default DispatchGroupCategory;