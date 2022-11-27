import DispatchCategory from "../dispatch-category";
import DispatchUnitAPI from "../../../api/dispatch-unit.api";

class DispatchUnitCategory extends DispatchCategory {
  constructor() {
    super();
  }

  updateCategoryUnits() {
    this.listElement.replaceChildren(
      ...DispatchUnitAPI.getDispatchUnitsByCategoryId(this.category.id)
    );
  }

  updateCategory() {
    super.updateCategory();
    this.updateCategoryUnits();
    this.updateCategoryCount();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default DispatchUnitCategory;