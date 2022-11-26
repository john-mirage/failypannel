import dispatchUnitApi from "../../api/dispatch-unit.api";

class DispatchUnit extends HTMLLIElement {
  #hasBeenMountedOnce = false;
  #numberElement;
  #textElement;
  #nameElement;
  #roleElement;

  static get observedAttributes() {
    return ["data-unit"];
  }

  constructor() {
    super();
    const templateContent = document.getElementById("template-dispatch-unit").content;
    this.#numberElement = templateContent.firstElementChild.cloneNode(true);
    this.#textElement = templateContent.lastElementChild.cloneNode(true);
    this.#nameElement = this.#textElement.querySelector('[data-js="name"]');
    this.#roleElement = this.#textElement.querySelector('[data-js="role"]');
  }

  get unit() {
    return this.dataset.unit;
  }

  set unit(newUnit) {
    if (typeof newUnit === "string") {
      this.dataset.unit = newUnit;
    } else {
      this.removeAttribute("data-unit");
    }
  }

  updateUnitNumber(unitNumber) {
    if (typeof unitNumber === "string") {
      if (this.#numberElement.textContent !== unitNumber) {
        this.#numberElement.textContent = unitNumber;
      }
    } else {
      throw new Error("The unit number is not a string");
    }
  }

  updateUnitName(unitName) {
    if (typeof unitName === "string") {
      if (this.#nameElement.textContent !== unitName) {
        this.#nameElement.textContent = unitName;
      }
      if (this.#nameElement.getAttribute("title") !== unitName) {
        this.#nameElement.setAttribute("title", unitName);
      }
    } else {
      throw new Error("The unit name is not a string");
    }
  }

  updateUnitRole(unitRole) {
    if (typeof unitRole === "string") {
      if (this.#roleElement.textContent !== unitRole) {
        this.#roleElement.textContent = unitRole;
      }
    } else {
      throw new Error("The unit role is not a string");
    }
  }

  updateUnit() {
    if (typeof this.unit === "string") {
      const unit = dispatchUnitApi.getUnitById(this.unit);
      this.updateUnitNumber(unit.number);
      this.updateUnitName(unit.name);
      this.updateUnitRole(unit.role);
    } else {
      throw new Error("The unit is not defined");
    }
  }

  clearUnit() {
    this.#numberElement.textContent = null;
    this.#nameElement.textContent = null;
    this.#nameElement.removeAttribute("title");
    this.#roleElement.textContent = null;
  }

  connectedCallback() {
    if (!this.#hasBeenMountedOnce) {
      this.classList.add("dispatchUnit");
      this.replaceChildren(this.#numberElement, this.#textElement);
      this.#hasBeenMountedOnce = true;
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-unit": {
        if (typeof newValue === "string") {
          this.updateUnit();
        } else {
          this.clearUnit();
        }
        break;
      }
    }
  }
}

export default DispatchUnit;
