import DispatchAPI from "../../api/dispatch.api";

class DispatchView extends HTMLElement {
  #hasBeenMountedOnce = false;
  #headerElement;
  #listElement;
  #dispatchAPI = new DispatchAPI();

  constructor() {
    super();
    const templateContent = document.getElementById("template-dispatch-view").content;
    this.#headerElement = templateContent.firstElementChild.cloneNode(true);
    this.#listElement = templateContent.lastElementChild.cloneNode(true);
    this.handleCreateCategoryEvent = this.handleCreateCategoryEvent.bind(this);
    this.handleDeleteGroupEvent = this.handleDeleteGroupEvent.bind(this);
  }

  updateDispatchCategories() {
    this.#listElement.replaceChildren(...this.#dispatchAPI.dispatchCategoryArray);
  }

  updateDispatchListColumns() {
    const numberOfColumns = this.#listElement.children.length;
    const gridTemplateColumns = `repeat(${String(numberOfColumns)}, 296px)`;
    this.#listElement.style.gridTemplateColumns = gridTemplateColumns;
  }

  updateDispatch() {
    this.updateDispatchCategories();
    this.updateDispatchListColumns();
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

  handleCreateCategoryEvent(customEvent) {
    // handle create category
  }

  handleDeleteGroupEvent(customEvent) {
    // handle delete group
  }
}

export default DispatchView;
