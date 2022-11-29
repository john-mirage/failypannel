export const categoryIsValid = (category) => {
  return (
    Object.keys(category).length === 2 &&
    category.hasOwnProperty("id") &&
    category.hasOwnProperty("name") &&
    typeof category.id === "string" &&
    typeof category.name === "string"
  );
};

export const categoriesAreValid = (categories) => {
  return (
    Array.isArray(categories) &&
    categories.every((category) => categoryIsValid(category))
  );
}

export const categoriesAreTheSame = (oldCategory, newCategory) => {
  if (categoriesAreValid([oldCategory, newCategory])) {
    return (
      oldCategory.id === newCategory.id &&
      oldCategory.name === newCategory.name
    );
  } else {
    throw new Error("The categories are not valid");
  }
}