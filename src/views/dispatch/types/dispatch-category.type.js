export const categoryIsValid = (category) => {
  return (
    Object.keys(category).length === 3 &&
    category.hasOwnProperty("id") &&
    category.hasOwnProperty("type") &&
    category.hasOwnProperty("name") &&
    typeof category.id === "string" &&
    typeof category.type === "string" &&
    typeof category.name === "string"
  );
};