import DispatchCategoryAPI from "./dispatch-category.api";

class DispatchUnitCategoryAPI extends DispatchCategoryAPI {
  constructor(categories) {
    super(
      categories,
      document.createElement("li", { is: "dispatch-unit-category" })
    );
  }
}

export default DispatchUnitCategoryAPI;