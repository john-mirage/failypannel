import dispatchApi from "../../../api/dispatch-api";
import { groupIsValid } from "../../../helpers/type-checkers";
import Sortable from "sortablejs";

class WebDispatchGroup extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #template;
  #nameElement;
  #numberElement;
  #listElement;
  #webDispatchUnit = document.createElement("web-dispatch-unit");
  #sortableInstance;
  #group;

  constructor() {
    super();
    const template = document.getElementById("template-web-dispatch-group");
    this.#template = template.content.firstElementChild.cloneNode(true);
    this.#nameElement = this.#template.querySelector('[data-js="name"]');
    this.#numberElement = this.#template.querySelector('[data-js="number"]');
    this.#listElement = this.#template.querySelector('[data-js="list"]');
  }

  get group() {
    if (this.#group) {
      return this.#group;
    } else {
      throw new Error("The group is not defined");
    }
  }

  set group(newGroup) {
    if (groupIsValid(newGroup)) {
      this.#group = newGroup;
      if (this.isConnected) {
        this.updateGroup();
      }
    } else {
      throw new Error("The new group is not valid");
    }
  }

  updateGroupName() {
    const category = dispatchApi.getCategoryById(this.group.id);
    if (this.#nameElement.textContent !== category.name) {
      this.#nameElement.textContent = category.name;
    }
  }

  updateGroupNumber() {
    const firstUnitNumber = this.#listElement.firstElementChild?.unit.number;
    if (
      firstUnitNumber &&
      this.#numberElement.textContent !== firstUnitNumber
    ) {
      this.#numberElement.textContent = firstUnitNumber;
    }
  }

  updateGroupUnits() {
    const units = dispatchApi.getGroupUnits(this.group.id);
    const webDispatchUnits = units.map((unit) => {
      const webDispatchUnit = this.#webDispatchUnit.cloneNode(true);
      webDispatchUnit.unit = unit;
      return webDispatchUnit;
    });
    this.#listElement.replaceChildren(...webDispatchUnits);
  }

  handleSortableFeature() {
    const isSortable = this.group.size > this.#listElement.children.length;
    if (isSortable) {
      this.#sortableInstance.option("group", { name: "unit", put: true });
    } else {
      this.#sortableInstance.option("group", { name: "unit", put: false });
    }
  }

  handleListHeight() {
    const style = getComputedStyle(this.#listElement);
    const gapProperty = style.getPropertyValue("--_list-gap");
    const paddingProperty = style.getPropertyValue("--_list-padding");
    const listItemHeightProperty = style.getPropertyValue(
      "--_list-item-height"
    );
    const gapNumber = String(Number(group.size) - 1);
    this.#listElement.style.setProperty(
      "--_list-height",
      `calc((${gapProperty} * ${gapNumber}) + (${paddingProperty} * 2) + (${listItemHeightProperty} * ${this.group.size}))`
    );
  }

  updateGroup() {
    this.updateGroupName();
    this.updateGroupNumber();
    this.updateGroupUnits();
    this.handleSortableFeature();
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("webDispatchGroup");
      this.append(this.#template);
      this.upgradeProperty("group");
      this.#sortableInstance = new Sortable(this.#listElement, {
        group: "unit",
        onSort: () => {
          this.updateGroupNumber();
          this.handleSortableFeature();
        },
      });
      this.#hasBeenMountedOnce = true;
    }
    this.updateGroup();
  }
}

export default WebDispatchGroup;
