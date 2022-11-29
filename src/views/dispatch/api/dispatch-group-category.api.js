import DispatchCategoryAPI from "./dispatch-category.api";

class DispatchGroupCategoryAPI extends DispatchCategoryAPI {
  constructor(categories) {
    super(
      categories,
      document.createElement("li", { is: "dispatch-group-category" })
    );
  }
}

export default DispatchGroupCategoryAPI;