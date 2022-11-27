import DispatchCategoryAPI from "../../api/dispatch-category.api";
import DispatchGroupAPI from "../../api/dispatch-group.api";
import DispatchUnitAPI from "../../api/dispatch-unit.api";
import categories from "../../data/dispatch-category.data.json";
import groups from "../../data/dispatch-group.data.json";
import units from "../../data/dispatch-unit.data.json";

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
    this.addEventListener("dispatch-delete-group", this.handleDeleteGroupEvent);
  }

  disconnectedCallback() {
    this.removeEventListener("dispatch-delete-group", this.handleDeleteGroupEvent);
  }

  handleDeleteGroupEvent(customEvent) {
    const { groupId } = customEvent.detail;
    DispatchGroupAPI.deleteDispatchGroup(groupId);
  }
}

export default DispatchView;
