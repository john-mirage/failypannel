import DispatchGroup from "../components/dispatch-group";
import groups from "../data/dispatch-group.data.json";
import dispatchUnitAPI from "./dispatch-unit.api";
import { groupIsValid } from "../types/dispatch-group.type";
import { compareTwoNumbers } from "../../../utils/comparison";

class DispatchGroupAPI {
  #groups = new Map();
  #groupsUnits = new Map();
  #groupsSubscribers = new Map();

  constructor(groups) {
    if (Array.isArray(groups) && groups.every((group) => groupIsValid(group))) {
      groups.forEach((group) => {
        this.#groups.set(group.id, group);
        const groupUnits = this.getGroupUnits(group.id);
        this.#groupsUnits.set(group.id, groupUnits);
      });
      this.compareTwoUnitsByOrderId = this.compareTwoUnitsByOrderId.bind(this);
      console.log("dispatch group");
    } else {
      throw new Error("The groups are not valid");
    }
  }

  get groups() {
    return [...this.#groups.values()];
  }

  compareTwoUnitsByOrderId(unitA, unitB) {
    return compareTwoNumbers(unitA.parentOrderId, unitB.parentOrderId);
  }

  getGroup(groupId) {
    if (this.#groups.has(groupId)) {
      return this.#groups.get(groupId);
    } else {
      throw new Error("The group has not been found");
    }
  }

  getGroupUnits(groupId) {
    const units = dispatchUnitAPI.units.filter((unit) => {
      return unit.parentType === "group" && groupId === unit.parentId;
    });
    return units.sort(this.compareTwoUnitsByOrderId);
  }

  subscribeToGroup(dispatchGroup) {
    if (dispatchGroup instanceof DispatchGroup) {
      if (this.#groups.has(dispatchGroup.group.id)) {
        this.#groupsSubscribers.set(dispatchGroup.group.id, dispatchGroup);
      } else {
        throw new Error("The group has not been found");
      }
    } else {
      throw new Error("The dispatch group is not valid");
    }
  }

  unsubscribeToGroup(dispatchGroup) {
    if (dispatchGroup instanceof DispatchGroup) {
      if (this.#groupsSubscribers.has(dispatchGroup.group.id)) {
        this.#groupsSubscribers.delete(dispatchGroup.group.id);
      } else {
        throw new Error("The dispatch group to delete has not been found");
      }
    } else {
      throw new Error("The group has not been found");
    }
  }

  dispatchGroup(groupId) {
    if (this.#groups.has(groupId)) {
      if (this.#groupsSubscribers.has(groupId)) {
        const dispatchGroup = this.#groupsSubscribers.get(groupId);
        dispatchGroup.group = this.#groups.get(groupId);
      }
    } else {
      throw new Error("The group has not been found");
    }
  }

  dispatchGroupUnits(groupId) {
    if (this.#groupsUnits.has(groupId)) {
      if (this.#groupsSubscribers.has(groupId)) {
        const dispatchGroup = this.#groupsSubscribers.get(groupId);
        dispatchGroup.units = this.#groupsUnits.get(groupId);
      }
    } else {
      throw new Error("The group units have not been found");
    }
  }

  reorderGroupUnits(groupId, unitIds) {
    if (
      this.#groups.has(groupId) &&
      Array.isArray(unitIds) &&
      unitIds.every((unitId) => dispatchUnitAPI.hasUnit(unitId))
    ) {
      const group = this.#groups.get(groupId);
      unitIds.forEach((unitId, unitIdIndex) => {
        const unit = dispatchUnitAPI.getUnit(unitId);
        if (unit.parentType === "group" && group.id === unit.parentId) {
          if (unit.parentOrderId !== unitIdIndex) {
            unit.parentOrderId = unitIdIndex;
          }
        } else {
          throw new Error("The unit does not belong to the group");
        }
      });
    } else {
      throw new Error("The group and units have not been found");
    }
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
        this.dispatchGroup(newGroup.id);
      } else {
        throw new Error("The old group has not been found");
      }
    } else {
      throw new Error("The new group is not valid");
    }
  }

  updateGroupUnits(groupId) {
    if (this.#groupsUnits.has(groupId)) {
      const groupUnits = this.getGroupUnits(groupId);
      this.#groupsUnits.set(groupId, groupUnits);
      this.dispatchGroupUnits(groupId);
    } else {
      throw new Error("The old group units have not been found");
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