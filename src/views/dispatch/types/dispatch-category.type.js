export const categoryIsValid = (category) => {
  return (
    Object.keys(category).length === 2 &&
    category.hasOwnProperty("id") &&
    category.hasOwnProperty("name") &&
    typeof category.id === "string" &&
    typeof category.name === "string"
  );
};