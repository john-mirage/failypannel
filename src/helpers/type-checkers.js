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

export const groupIsValid = (group) => {
  return (
    Object.keys(group).length === 3 &&
    group.hasOwnProperty("categoryId") &&
    group.hasOwnProperty("id") &&
    group.hasOwnProperty("size") &&
    typeof group.categoryId === "string" &&
    typeof group.id === "string" &&
    typeof group.size === "string"
  );
};

export const unitIsValid = (unit) => {
  return (
    Object.keys(unit).length === 6 &&
    unit.hasOwnProperty("categoryId") &&
    unit.hasOwnProperty("groupId") &&
    unit.hasOwnProperty("id") &&
    unit.hasOwnProperty("number") &&
    unit.hasOwnProperty("name") &&
    unit.hasOwnProperty("role") &&
    typeof unit.categoryId === "string" &&
    (typeof unit.groupId === "string" || unit.groupId === null) &&
    typeof unit.id === "string" &&
    typeof unit.number === "string" &&
    typeof unit.name === "string" &&
    typeof unit.role === "string"
  );
};
