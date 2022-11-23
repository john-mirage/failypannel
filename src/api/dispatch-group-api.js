import groups from "../data/dispatch-groups.json";
import dispatchUnitApi from "./dispatch-unit-api";
import { groupIsValid } from "../helpers/type-checkers";

class DispatchGroupAPI {
  #groups = new Map();
  #groupsUnits = new Map();
  #groupsSubscribers = new Map();

  constructor(groups) {
    if (
      Array.isArray(groups) &&
      groups.every((group) => groupIsValid(group))
    ) {
      groups.forEach((group) => {
        this.#groups.set(group.id, group);
      });
    } else {
      throw new Error("The groups are not valid");
    }
  }

  get groups() {
    return [...this.#groups.values()];
  }

  getGroupUnits(groupId) {
    return dispatchUnitApi.units.filter((unit) => {
      return groupId === unit.parentId;
    });
  }
}

export default new DispatchGroupAPI(groups);