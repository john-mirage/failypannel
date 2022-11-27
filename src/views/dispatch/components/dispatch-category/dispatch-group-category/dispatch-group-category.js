import DispatchCategory from "../dispatch-category";
import DispatchGroupAPI from "../../../api/dispatch-group.api";

class DispatchGroupCategory extends DispatchCategory {
  constructor() {
    super();
  }

  updateCategoryGroups() {
    this.listElement.replaceChildren(
      ...DispatchGroupAPI.getDispatchGroupsByCategoryId(this.category.id)
    );
  }

  updateCategory() {
    super.updateCategory();
    this.updateCategoryGroups();
    this.updateCategoryCount();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default DispatchGroupCategory;