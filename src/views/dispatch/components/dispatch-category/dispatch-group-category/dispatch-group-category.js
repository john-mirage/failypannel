import DispatchCategory from "../dispatch-category";
import dispatchGroupAPI from "../../../api/dispatch-group.api";

class DispatchGroupCategory extends DispatchCategory {
  #dispatchGroup = document.createElement("li", { is: "dispatch-group" });

  constructor() {
    super();
  }

  updateCategoryGroups() {
    if (typeof this.category === "string") {
      const groups = dispatchGroupAPI.getGroupsByCategoryId(this.category);
      const dispatchGroups = groups.map((group) => {
        const dispatchGroup = this.#dispatchGroup.cloneNode(true);
        dispatchGroup.dataset.group = group.id;
        return dispatchGroup;
      });
      this.listElement.replaceChildren(...dispatchGroups);
    } else {
      throw new Error("The category is not defined");
    }
  }

  reorderCategoryGroups() {
    if (typeof this.category === "string") {
      const dispatchGroups = [...this.listElement.children];
      if (dispatchGroups.length > 0) {
        dispatchGroups.forEach((dispatchGroup, dispatchGroupIndex) => {
          const group = dispatchGroupAPI.getGroupById(dispatchGroup.group);
          dispatchGroupAPI.updateGroup({
            ...group,
            categoryId: this.category,
            categoryOrderId: dispatchGroupIndex,
          });
        });
        console.log(dispatchGroupAPI.groups);
      }
    } else {
      throw new Error("The category is not defined");
    }
  }

  updateCategory() {
    super.updateCategory();
    this.updateCategoryGroups();
    this.updateCategoryCount();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default DispatchGroupCategory;