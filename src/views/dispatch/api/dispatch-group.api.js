import { compareTwoNumbers } from "../../../utils/comparison";
import { groupIsValid, groupsAreTheSame, groupsAreValid } from "../types/dispatch-group.type";

class DispatchGroupAPI {
  #dispatchGroup = document.createElement("li", { is: "dispatch-group" });
  #dispatchGroupMap = new Map();

  constructor(groups) {
    if (groupsAreValid(groups)) {
      this.compareTwoDispatchGroupsByOrderId = this.compareTwoDispatchGroupsByOrderId.bind(this);
      this.createDispatchGroup = this.createDispatchGroup.bind(this);
      groups.forEach(this.createDispatchGroup);
    } else {
      throw new Error("The groups are not valid");
    }
  }

  get dispatchGroupArray() {
    return [...this.#dispatchGroupMap.values()];
  }

  get dispatchGroupMap() {
    return this.#dispatchGroupMap;
  }

  compareTwoDispatchGroupsByOrderId(dispatchGroupA, dispatchGroupB) {
    return compareTwoNumbers(
      dispatchGroupA.group.categoryOrderId,
      dispatchGroupB.group.categoryOrderId
    );
  }

  getDispatchGroupById(groupId) {
    if (this.#dispatchGroupMap.has(groupId)) {
      return this.#dispatchGroupMap.get(groupId);
    } else {
      throw new Error("The group element has not been found");
    }
  }

  getDispatchGroupsByCategoryId(categoryId) {
    const dispatchGroups = this.dispatchGroupArray.filter((dispatchGroup) => {
      return categoryId === dispatchGroup.group.categoryId;
    });
    dispatchGroups.sort(this.compareTwoDispatchGroupsByOrderId);
    return dispatchGroups;
  }

  createDispatchGroup(newGroup) {
    if (groupIsValid(newGroup)) {
      if (!this.#dispatchGroupMap.has(newGroup.id)) {
        const dispatchGroup = this.#dispatchGroup.cloneNode(true);
        dispatchGroup.group = newGroup;
        this.#dispatchGroupMap.set(newGroup.id, dispatchGroup);
      } else {
        throw new Error("The dispatch group already exist");
      }
    } else {
      throw new Error("The new group is not valid");
    }
  }

  updateDispatchGroup(newGroup) {
    if (groupIsValid(newGroup)) {
      if (this.#dispatchGroupMap.has(newGroup.id)) {
        const dispatchGroup = this.#dispatchGroupMap.get(newGroup.id);
        if (!groupsAreTheSame(dispatchGroup.group, newGroup)) {
          dispatchGroup.group = newGroup;
        }
      } else {
        throw new Error("The old group has not been found");
      }
    } else {
      throw new Error("The new group is not valid");
    }
  }

  deleteDispatchGroup(groupId) {
    if (this.#dispatchGroupMap.has(groupId)) {
      this.#dispatchGroupMap.delete(groupId);
    } else {
      throw new Error("The dispatch group to delete has not been found");
    }
  }
}

export default DispatchGroupAPI;