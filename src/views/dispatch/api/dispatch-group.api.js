import { compareTwoNumbers } from "../../../utils/comparison";
import { groupIsValid } from "../types/dispatch-group.type";
import DispatchGroupCategory from "../components/dispatch-category/dispatch-group-category";

class DispatchGroupAPI {
  static #dispatchGroup = document.createElement("li", { is: "dispatch-group" });
  static #dispatchGroups = new Map();

  static get dispatchGroups() {
    return [...this.#dispatchGroups.values()];
  }

  static set dispatchGroups(newGroups) {
    if (
      Array.isArray(newGroups) &&
      newGroups.every((group) => groupIsValid(group))
    ) {
      newGroups.forEach(this.createDispatchGroup.bind(this));
    } else {
      throw new Error("The groups are not valid");
    }
  }

  static compareTwoDispatchGroupsByOrderId(dispatchGroupA, dispatchGroupB) {
    return compareTwoNumbers(
      dispatchGroupA.group.categoryOrderId,
      dispatchGroupB.group.categoryOrderId
    );
  }

  static getDispatchGroupById(groupId) {
    if (this.#dispatchGroups.has(groupId)) {
      return this.#dispatchGroups.get(groupId);
    } else {
      throw new Error("The group element has not been found");
    }
  }

  static getDispatchGroupsByCategoryId(categoryId) {
    const dispatchGroups = this.dispatchGroups.filter((dispatchGroup) => {
      return categoryId === dispatchGroup.group.categoryId;
    });
    dispatchGroups.sort(this.compareTwoDispatchGroupsByOrderId.bind(this));
    return dispatchGroups;
  }

  static createDispatchGroup(newGroup) {
    if (groupIsValid(newGroup)) {
      if (!this.#dispatchGroups.has(newGroup.id)) {
        const dispatchGroup = this.#dispatchGroup.cloneNode(true);
        dispatchGroup.group = newGroup;
        this.#dispatchGroups.set(newGroup.id, dispatchGroup);
      } else {
        throw new Error("The dispatch group already exist");
      }
    } else {
      throw new Error("The new group is not valid");
    }
  }

  static updateDispatchGroup(newGroup) {
    if (groupIsValid(newGroup)) {
      if (this.#dispatchGroups.has(newGroup.id)) {
        const dispatchGroup = this.#dispatchGroups.get(newGroup.id);
        dispatchGroup.group = newGroup;
      } else {
        throw new Error("The old group has not been found");
      }
    } else {
      throw new Error("The new group is not valid");
    }
  }

  static updateDispatchGroupsCategory(dispatchGroupCategory) {
    if (dispatchGroupCategory instanceof DispatchGroupCategory) {
      const dispatchGroups = [...dispatchGroupCategory.listElement.children];
      if (dispatchGroups.length > 0) {
        dispatchGroups.forEach((dispatchGroup, dispatchGroupIndex) => {
          DispatchGroupAPI.updateDispatchGroup({
            ...dispatchGroup.group,
            categoryId: dispatchGroupCategory.category.id,
            categoryOrderId: dispatchGroupIndex,
          });
        });
      }
    } else {
      throw new Error("The dispatch category is not valid");
    }
  }

  static deleteDispatchGroup(groupId) {
    if (this.#dispatchGroups.has(groupId)) {
      this.#dispatchGroups.delete(groupId);
    } else {
      throw new Error("The dispatch group to delete has not been found");
    }
  }
}

export default DispatchGroupAPI;