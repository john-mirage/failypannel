import DispatchAPI from "../../api/dispatch.api";
import groupCategories from "../../data/dispatch-group-category.data.json";
import unitCategories from "../../data/dispatch-unit-category.data.json";
import groups from "../../data/dispatch-group.data.json";
import units from "../../data/dispatch-unit.data.json";

class DispatchView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #headerElement;
  #bodyElement;
  #unitListElement;
  #groupListElement;
  #dispatchAPI = new DispatchAPI(groupCategories, unitCategories, groups, units);

  constructor() {
    super();
    const templateContent = document.getElementById("template-dispatch-view").content;
    this.#headerElement = templateContent.firstElementChild.cloneNode(true);
    this.#bodyElement = templateContent.lastElementChild.cloneNode(true);
    this.#unitListElement = this.#bodyElement.querySelector(['[data-js="unit-list"]']);
    this.#groupListElement = this.#bodyElement.querySelector(['[data-js="group-list"]']);
    this.handleCreateGroupCategoryEvent = this.handleCreateGroupCategoryEvent.bind(this);
    this.handleDeleteGroupEvent = this.handleDeleteGroupEvent.bind(this);
    this.handleSortUnitCategory = this.handleSortUnitCategory.bind(this);
  }

  updateDispatchUnitCategories() {
    this.#unitListElement.replaceChildren(...this.#dispatchAPI.dispatchUnitCategoryAPI.dispatchCategoryArray);
  }

  updateDispatchGroupCategories() {
    this.#groupListElement.replaceChildren(...this.#dispatchAPI.dispatchGroupCategoryAPI.dispatchCategoryArray);
  }

  updateDispatchListColumns(listElement) {
    if (listElement instanceof HTMLUListElement) {
      const numberOfColumns = listElement.children.length;
      const gridTemplateColumns = `repeat(${String(numberOfColumns)}, 296px)`;
      listElement.style.gridTemplateColumns = gridTemplateColumns;
    } else {
      throw new Error("The list element is not valid");
    }
  }

  updateDispatch() {
    this.updateDispatchUnitCategories();
    this.updateDispatchGroupCategories();
    this.updateDispatchListColumns(this.#unitListElement);
    this.updateDispatchListColumns(this.#groupListElement);
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchView");
      this.replaceChildren(this.#headerElement, this.#bodyElement);
      this.updateDispatch();
      this.#hasBeenMountedOnce = true;
    }
    this.addEventListener("dispatch-create-group-category", this.handleCreateGroupCategoryEvent);
    this.addEventListener("dispatch-delete-group", this.handleDeleteGroupEvent);
    this.addEventListener("dispatch-sort-unit-category", this.handleSortUnitCategory);
  }

  disconnectedCallback() {
    this.removeEventListener("dispatch-create-group-category", this.handleCreateGroupCategoryEvent);
    this.removeEventListener("dispatch-delete-group", this.handleDeleteGroupEvent);
    this.removeEventListener("dispatch-sort-unit-category", this.handleSortUnitCategory);
  }

  handleCreateGroupCategoryEvent(customEvent) {
    // handle create category
  }

  handleDeleteGroupEvent(customEvent) {
    // handle delete group
  }

  handleSortUnitCategory(customEvent) {
    const { unitId } = customEvent.detail;
    console.log(this.#dispatchAPI.dispatchUnitAPI.getDispatchUnitById(unitId).unit);
  }
}

export default DispatchView;
