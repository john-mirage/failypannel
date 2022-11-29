import DispatchGroupCategory from "../components/dispatch-category/dispatch-group-category";
import DispatchUnitCategory from "../components/dispatch-category/dispatch-unit-category";
import DispatchGroup from "../components/dispatch-group";
import { categoriesAreValid } from "../types/dispatch-category.type";
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
    this.updateCategoryGroups = this.updateCategoryGroups.bind(this);
    this.updateCategoryUnits = this.updateCategoryUnits.bind(this);
    this.updateGroupUnits = this.updateGroupUnits.bind(this);
    this.#dispatchGroupCategoryAPI.dispatchCategoryMap.forEach(this.updateCategoryGroups);
    this.#dispatchUnitCategoryAPI.dispatchCategoryMap.forEach(this.updateCategoryUnits);
    this.#dispatchGroupAPI.dispatchGroupArray.forEach(this.updateGroupUnits);
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

  updateDispatchGroupCategories(groupCategories) {

  }

  updateDispatchUnitsCategories(unitCategories) {

  }

  updateDispatchGroups(groups) {

  }

  updateDispatchUnits(units) {

  }

  updateCategoryGroups(dispatchGroupCategory) {
    if (dispatchGroupCategory instanceof DispatchGroupCategory) {
      const dispatchGroups = this.#dispatchGroupAPI.getDispatchGroupsByCategoryId(dispatchGroupCategory.category.id);
      dispatchGroups.forEach((dispatchGroup) => dispatchGroup.categoryName = dispatchGroupCategory.category.name);
      dispatchGroupCategory.dispatchGroups = dispatchGroups;
    } else {
      throw new Error("The dispatch group category is not valid");
    }
  }

  updateCategoryUnits(dispatchUnitCategory) {
    if (dispatchUnitCategory instanceof DispatchUnitCategory) {
      const dispatchUnits = this.#dispatchUnitAPI.getDispatchUnitsByCategoryId(dispatchUnitCategory.category.id);
      dispatchUnitCategory.dispatchUnits = dispatchUnits;
    } else {
      throw new Error("The dispatch unit category is not valid");
    }
  }

  updateGroupUnits(dispatchGroup) {
    if (dispatchGroup instanceof DispatchGroup) {
      const dispatchUnits = this.#dispatchUnitAPI.getDispatchUnitsByGroupId(dispatchGroup.group.id);
      dispatchGroup.dispatchUnits = dispatchUnits;
    } else {
      throw new Error("The dispatch group is not valid");
    }
  }

  updateDispatchGroupsCategory(dispatchGroupCategory) {
    if (dispatchGroupCategory instanceof DispatchGroupCategory) {
      const dispatchGroups = [...dispatchGroupCategory.listElement.children];
      if (dispatchGroups.length > 0) {
        dispatchGroups.forEach((dispatchGroup, dispatchGroupIndex) => {
          this.#dispatchUnitAPI.updateDispatchGroup({
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

  updateDispatchUnitsCategory(dispatchUnitCategory) {
    if (dispatchUnitCategory instanceof DispatchUnitCategory) {
      const dispatchUnits = [...dispatchUnitCategory.listElement.children];
      if (dispatchUnits.length > 0) {
        dispatchUnits.forEach((dispatchUnit, dispatchUnitIndex) => {
          this.#dispatchUnitAPI.updateDispatchUnit({
            ...dispatchUnit.unit,
            parentType: "category",
            parentId: dispatchUnitCategory.category.id,
            parentOrderId: dispatchUnitIndex,
          });
        });
      }
    } else {
      throw new Error("The dispatch category is not valid");
    }
  }

  updateDispatchUnitsGroup(dispatchGroup) {
    if (dispatchGroup instanceof DispatchGroup) {
      const dispatchUnits = [...dispatchGroup.listElement.children];
      if (dispatchUnits.length > 0) {
        dispatchUnits.forEach((dispatchUnit, dispatchUnitIndex) => {
          this.#dispatchUnitAPI.updateDispatchUnit({
            ...dispatchUnit.unit,
            parentType: "group",
            parentId: dispatchGroup.group.categoryId,
            parentOrderId: dispatchUnitIndex,
          });
        });
      }
    } else {
      throw new Error("The dispatch group is not valid");
    }
  }
}

export default DispatchAPI;