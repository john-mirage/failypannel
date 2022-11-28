import { nanoid } from "nanoid";
import DispatchCategoryAPI from "../../api/dispatch-category.api";
import DispatchGroupAPI from "../../api/dispatch-group.api";
import DispatchUnitAPI from "../../api/dispatch-unit.api";
import categories from "../../data/dispatch-category.data.json";
import groups from "../../data/dispatch-group.data.json";
import units from "../../data/dispatch-unit.data.json";
import DispatchGroupCategory from "../dispatch-category/dispatch-group-category";
import DispatchUnitCategory from "../dispatch-category/dispatch-unit-category";
import DispatchGroup from "../dispatch-group";

const WAITING_CATEGORY_ID = "2";

class DispatchView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #headerElement;
  #listElement;

  constructor() {
    super();
    const templateContent = document.getElementById("template-dispatch-view").content;
    this.#headerElement = templateContent.firstElementChild.cloneNode(true);
    this.#listElement = templateContent.lastElementChild.cloneNode(true);
    DispatchUnitAPI.dispatchUnits = units;
    DispatchGroupAPI.dispatchGroups = groups;
    DispatchCategoryAPI.dispatchCategories = categories;
    this.handleCreateCategoryEvent = this.handleCreateCategoryEvent.bind(this);
    this.handleDeleteGroupEvent = this.handleDeleteGroupEvent.bind(this);
  }

  updateCategories() {
    this.#listElement.replaceChildren(...DispatchCategoryAPI.dispatchCategories);
  }

  updateGridSize() {
    const numberOfColumns = this.#listElement.children.length;
    const gridTemplateColumns = `repeat(${String(numberOfColumns)}, 296px)`;
    this.#listElement.style.gridTemplateColumns = gridTemplateColumns;
  }

  updateDispatch() {
    this.updateCategories();
    this.updateGridSize();
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchView");
      this.replaceChildren(this.#headerElement, this.#listElement);
      this.#hasBeenMountedOnce = true;
    }
    this.updateDispatch();
    this.addEventListener("dispatch-create-category", this.handleCreateCategoryEvent);
    this.addEventListener("dispatch-delete-group", this.handleDeleteGroupEvent);
  }

  disconnectedCallback() {
    this.removeEventListener("dispatch-create-category", this.handleCreateCategoryEvent);
    this.removeEventListener("dispatch-delete-group", this.handleDeleteGroupEvent);
  }

  createDispatchCategory(categoryName, categoryType) {
    if (
      typeof categoryName === "string" &&
      typeof categoryType === "string"
    ) {
      const categoryId = nanoid();
      DispatchCategoryAPI.createDispatchCategory({
        id: categoryId,
        type: categoryType,
        name: categoryName,
      });
      const dispatchCategory = DispatchCategoryAPI.getDispatchCategoryById(categoryId);
      this.#listElement.append(dispatchCategory);
      this.updateGridSize();
    } else {
      throw new Error("The category name and/or type are not valid");
    }
  }

  deleteDisptachCategoryGroup(fromDispatchCategory, toDispatchCategory, dispatchGroup) {
    if (
      fromDispatchCategory instanceof DispatchGroupCategory &&
      toDispatchCategory instanceof DispatchUnitCategory &&
      dispatchGroup instanceof DispatchGroup
    ) {
      const dispatchUnits = DispatchUnitAPI.getDispatchUnitsByGroupId(dispatchGroup.group.id);
      dispatchGroup.remove();
      toDispatchCategory.listElement.append(...dispatchUnits);
      DispatchGroupAPI.deleteDispatchGroup(dispatchGroup.group.id);
      DispatchGroupAPI.updateDispatchGroupsCategory(fromDispatchCategory);
      DispatchUnitAPI.updateDispatchUnitsCategory(toDispatchCategory);
      fromDispatchCategory.updateCategoryCount();
      toDispatchCategory.updateCategoryCount();
    } else {
      throw new Error("The parameters are not valid");
    }
  }

  handleCreateCategoryEvent(customEvent) {
    const { categoryName, categoryType } = customEvent.detail;
    if (
      typeof categoryName === "string" &&
      typeof categoryType === "string"
    ) {
      this.createDispatchCategory(categoryName, categoryType);
    } else {
      throw new Error("The category name and/or type are not valid");
    }
  }

  handleDeleteGroupEvent(customEvent) {
    const { dispatchGroup } = customEvent.detail;
    if (dispatchGroup instanceof DispatchGroup) {
      const fromDispatchCategory = DispatchCategoryAPI.getDispatchCategoryById(dispatchGroup.group.categoryId);
      const toDispatchCategory = DispatchCategoryAPI.getDispatchCategoryById(WAITING_CATEGORY_ID);
      this.deleteDisptachCategoryGroup(fromDispatchCategory, toDispatchCategory, dispatchGroup);
    } else {
      throw new Error("The dispatch group is not valid");
    }
  }
}

export default DispatchView;
