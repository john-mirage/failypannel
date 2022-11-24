import { unitIsValid } from "../../../helpers/types";

class DispatchUnit extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #numberElement;
  #textElement;
  #nameElement;
  #roleElement;
  #unit;

  constructor() {
    super();
    const templateContent = document.getElementById(
      "template-dispatch-unit"
    ).content;
    this.#numberElement = templateContent.firstElementChild.cloneNode(true);
    this.#textElement = templateContent.lastElementChild.cloneNode(true);
    this.#nameElement = this.#textElement.querySelector('[data-js="name"]');
    this.#roleElement = this.#textElement.querySelector('[data-js="role"]');
  }

  get unit() {
    if (this.#unit) {
      return this.#unit;
    } else {
      throw new Error("The unit is not defined");
    }
  }

  set unit(newUnit) {
    if (unitIsValid(newUnit)) {
      this.#unit = newUnit;
      if (this.isConnected) {
        this.updateUnit();
      }
    } else {
      throw new Error("The new unit is not valid");
    }
  }

  updateUnitNumber() {
    const currentUnitNumber = this.unit.number;
    if (this.#numberElement.textContent !== currentUnitNumber) {
      this.#numberElement.textContent = currentUnitNumber;
    }
  }

  updateUnitName() {
    const currentUnitName = this.unit.name;
    if (this.#nameElement.textContent !== currentUnitName) {
      this.#nameElement.textContent = this.unit.name;
    }
    if (this.#nameElement.getAttribute("title") !== currentUnitName) {
      this.#nameElement.setAttribute("title", currentUnitName);
    }
  }

  updateUnitRole() {
    const newUnitRole = this.unit.role;
    if (this.#roleElement.textContent !== newUnitRole) {
      this.#roleElement.textContent = this.unit.role;
    }
  }

  updateUnit() {
    this.updateUnitNumber();
    this.updateUnitName();
    this.updateUnitRole();
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchUnit");
      this.replaceChildren(this.#numberElement, this.#textElement);
      this.#hasBeenMountedOnce = true;
    }
    this.updateUnit();
  }
}

export default DispatchUnit;
