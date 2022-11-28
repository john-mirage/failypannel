import DispatchCategoryAPI from "./dispatch-category.api";
import DispatchGroupAPI from "./dispatch-group.api";
import DispatchUnitAPI from "./dispatch-unit.api";
import categories from "../data/dispatch-category.data.json";
import groups from "../data/dispatch-group.data.json";
import units from "../data/dispatch-unit.data.json";
import DispatchGroupCategory from "../components/dispatch-category/dispatch-group-category";
import DispatchUnitCategory from "../components/dispatch-category/dispatch-unit-category";
import DispatchGroup from "../components/dispatch-group/dispatch-group";

const WAITING_CATEGORY_ID = "TBSIqlYArAsKxsdHlbGEn";

class DispatchAPI {
  #dispatchCategoryAPI = new DispatchCategoryAPI(categories);
  #dispatchGroupAPI = new DispatchGroupAPI(groups);
  #dispatchUnitAPI = new DispatchUnitAPI(units);

  constructor() {
    this.insertDispatchCategoriesUnits();
    this.insertDispatchCategoriesGroups();
    this.insertDispatchGroupsUnits();
  }

  get dispatchCategoryAPI() {
    return this.#dispatchCategoryAPI;
  }

  get dispatchGroupAPI() {
    return this.#dispatchGroupAPI;
  }

  get dispatchUnitAPI() {
    return this.#dispatchUnitAPI;
  }

  get dispatchCategoryArray() {
    return this.#dispatchCategoryAPI.dispatchCategoryArray;
  }

  insertDispatchCategoriesGroups() {
    this.#dispatchCategoryAPI.dispatchCategoryArray.forEach((dispatchCategory) => {
      const dispatchGroups = this.#dispatchGroupAPI.getDispatchGroupsByCategoryId(dispatchCategory.category.id);
      dispatchGroups.forEach((dispatchGroup) => dispatchGroup.categoryName = dispatchCategory.category.name);
      dispatchCategory.dispatchGroups = dispatchGroups;
    });
  }

  insertDispatchCategoriesUnits() {
    this.#dispatchCategoryAPI.dispatchCategoryArray.forEach((dispatchCategory) => {
      const dispatchUnits = this.#dispatchUnitAPI.getDispatchUnitsByCategoryId(dispatchCategory.category.id);
      dispatchCategory.dispatchUnits = dispatchUnits;
    });
  }

  insertDispatchGroupsUnits() {
    this.#dispatchGroupAPI.dispatchGroupArray.forEach((dispatchGroup) => {
      const dispatchUnits = this.#dispatchUnitAPI.getDispatchUnitsByGroupId(dispatchGroup.group.id);
      dispatchGroup.dispatchUnits = dispatchUnits;
    });
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