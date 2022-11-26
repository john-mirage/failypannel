import { compareTwoNumbers } from "../../../utils/comparison";
import groups from "../data/dispatch-group.data.json";
import { groupIsValid } from "../types/dispatch-group.type";

class DispatchGroupAPI {
  #groups = new Map();

  constructor(groups) {
    if (
      Array.isArray(groups) &&
      groups.every((group) => groupIsValid(group))
    ) {
      groups.forEach((group) => {
        this.#groups.set(group.id, group);
      });
      this.compareTwoGroupsByOrderId = this.compareTwoGroupsByOrderId.bind(this);
    } else {
      throw new Error("The groups are not valid");
    }
  }

  get groups() {
    return [...this.#groups.values()];
  }

  compareTwoGroupsByOrderId(groupA, groupB) {
    return compareTwoNumbers(groupA.categoryOrderId, groupB.categoryOrderId);
  }

  getGroupById(groupId) {
    if (this.#groups.has(groupId)) {
      return this.#groups.get(groupId);
    } else {
      throw new Error("The group has not been found");
    }
  }

  getGroupsByCategoryId(categoryId) {
    const groups = this.groups.filter((group) => {
      return categoryId === group.categoryId;
    });
    return groups.sort(this.compareTwoGroupsByOrderId);
  }

  addGroup(newGroup) {
    if (groupIsValid(newGroup)) {
      if (!this.#groups.has(newGroup.id)) {
        this.#groups.set(newGroup.id, newGroup);
      } else {
        throw new Error("The group already exist");
      }
    } else {
      throw new Error("The new group is not valid");
    }
  }

  updateGroup(newGroup) {
    if (groupIsValid(newGroup)) {
      if (this.#groups.has(newGroup.id)) {
        this.#groups.set(newGroup.id, newGroup);
      } else {
        throw new Error("The old group has not been found");
      }
    } else {
      throw new Error("The new group is not valid");
    }
  }

  deleteGroup(groupId) {
    if (this.#groups.has(groupId)) {
      this.#groups.delete(groupId);
    } else {
      throw new Error("The group to delete has not been found");
    }
  }
}

export default new DispatchGroupAPI(groups);