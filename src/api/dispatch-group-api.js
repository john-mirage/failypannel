import groups from "../data/dispatch-groups.json";
import { groupIsValid } from "../helpers/type-checkers";

class DispatchGroupAPI {
  #groups = new Map();
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
}

export default new DispatchGroupAPI(groups);