import { unitIsValid } from "../../types/dispatch-unit.type";

class DispatchUnit extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #numberElement;
  #textElement;
  #nameElement;
  #roleElement;
  #unit;

  constructor() {
    super();
    const templateContent = document.getElementById("template-dispatch-unit").content;
    this.#numberElement = templateContent.firstElementChild.cloneNode(true);
    this.#textElement = templateContent.lastElementChild.cloneNode(true);
    this.#nameElement = this.#textElement.querySelector('[data-js="name"]');
    this.#roleElement = this.#textElement.querySelector('[data-js="role"]');
  }

  get unit() {
    if (unitIsValid(this.#unit)) {
      return this.#unit;
    } else {
      throw new Error("The unit is not valid");
    }
  }

  set unit(newUnit) {
    if (unitIsValid(newUnit)) {
      this.#unit = newUnit;
      this.updateUnit();
    } else {
      throw new Error("The new unit is not valid");
    }
  }

  updateUnitNumber() {
    if (this.#numberElement.textContent !== this.unit.number) {
      this.#numberElement.textContent = this.unit.number;
    }
  }

  updateUnitName() {
    if (this.#nameElement.textContent !== this.unit.name) {
      this.#nameElement.textContent = this.unit.name;
    }
    if (this.#nameElement.getAttribute("title") !== this.unit.name) {
      this.#nameElement.setAttribute("title", this.unit.name);
    }
  }

  updateUnitRole() {
    if (this.#roleElement.textContent !== this.unit.role) {
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
  }
}

export default DispatchUnit;
