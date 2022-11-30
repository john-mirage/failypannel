import DispatchGroupCategory from "../components/dispatch-category/dispatch-group-category";
import DispatchUnitCategory from "../components/dispatch-category/dispatch-unit-category";
import DispatchGroup from "../components/dispatch-group";
import DispatchGroupCategoryAPI from "./dispatch-group-category.api";
import DispatchGroupAPI from "./dispatch-group.api";
import DispatchUnitCategoryAPI from "./dispatch-unit-category.api";
import DispatchUnitAPI from "./dispatch-unit.api";

const WAITING_CATEGORY_ID = "TBSIqlYArAsKxsdHlbGEn";

class DispatchAPI {
  #dispatchGroupCategoryAPI;
  #dispatchUnitCategoryAPI;
  #dispatchGroupAPI;
  #dispatchUnitAPI;

  constructor(groupCategories, unitCategories, groups, units) {
    this.#dispatchGroupCategoryAPI = new DispatchGroupCategoryAPI(groupCategories);
    this.#dispatchUnitCategoryAPI = new DispatchUnitCategoryAPI(unitCategories);
    this.#dispatchGroupAPI = new DispatchGroupAPI(groups);
    this.#dispatchUnitAPI = new DispatchUnitAPI(units);
    this.updateDispatchCategoryGroups = this.updateDispatchCategoryGroups.bind(this);
    this.updateDispatchCategoryUnits = this.updateDispatchCategoryUnits.bind(this);
    this.updateDispatchGroupUnits = this.updateDispatchGroupUnits.bind(this);
    this.#dispatchGroupCategoryAPI.dispatchCategoryMap.forEach(this.updateDispatchCategoryGroups);
    this.#dispatchUnitCategoryAPI.dispatchCategoryMap.forEach(this.updateDispatchCategoryUnits);
    this.#dispatchGroupAPI.dispatchGroupMap.forEach(this.updateDispatchGroupUnits);
  }

  get groupCategories() {
    return this.#dispatchGroupCategoryAPI.dispatchCategoryArray.map((dispatchCategory) => dispatchCategory.category);
  }

  get unitCategories() {
    return this.#dispatchUnitCategoryAPI.dispatchCategoryArray.map((dispatchCategory) => dispatchCategory.category);
  }

  get groups() {
    return this.#dispatchGroupAPI.dispatchGroupArray.map((dispatchGroup) => dispatchGroup.group);
  }

  get units() {
    return this.#dispatchUnitAPI.dispatchUnitArray.map((dispatchUnit) => dispatchUnit.unit);
  }

  get dispatchGroupCategoryAPI() {
    return this.#dispatchGroupCategoryAPI;
  }

  get dispatchUnitCategoryAPI() {
    return this.#dispatchUnitCategoryAPI;
  }

  get dispatchGroupAPI() {
    return this.#dispatchGroupAPI;
  }

  get dispatchUnitAPI() {
    return this.#dispatchUnitAPI;
  }

  updateDispatchCategoryGroups(dispatchGroupCategory) {
    if (dispatchGroupCategory instanceof DispatchGroupCategory) {
      const dispatchGroups = this.#dispatchGroupAPI.getDispatchGroupsByCategoryId(dispatchGroupCategory.category.id);
      dispatchGroups.forEach((dispatchGroup) => dispatchGroup.categoryName = dispatchGroupCategory.category.name);
      dispatchGroupCategory.dispatchGroups = dispatchGroups;
    } else {
      throw new Error("The dispatch group category is not valid");
    }
  }

  updateDispatchCategoryUnits(dispatchUnitCategory) {
    if (dispatchUnitCategory instanceof DispatchUnitCategory) {
      const dispatchUnits = this.#dispatchUnitAPI.getDispatchUnitsByCategoryId(dispatchUnitCategory.category.id);
      dispatchUnitCategory.dispatchUnits = dispatchUnits;
    } else {
      throw new Error("The dispatch unit category is not valid");
    }
  }

  updateDispatchGroupUnits(dispatchGroup) {
    if (dispatchGroup instanceof DispatchGroup) {
      const dispatchUnits = this.#dispatchUnitAPI.getDispatchUnitsByGroupId(dispatchGroup.group.id);
      dispatchGroup.dispatchUnits = dispatchUnits;
    } else {
      throw new Error("The dispatch group is not valid");
    }
  }
}

export default DispatchAPI;