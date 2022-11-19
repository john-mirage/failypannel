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
    Object.keys(group).length === 4 &&
    group.hasOwnProperty("categoryId") &&
    group.hasOwnProperty("categoryOrderId") &&
    group.hasOwnProperty("id") &&
    group.hasOwnProperty("size") &&
    typeof group.categoryId === "string" &&
    typeof group.categoryOrderId === "string" &&
    typeof group.id === "string" &&
    typeof group.size === "string"
  );
};

export const unitIsValid = (unit) => {
  return (
    Object.keys(unit).length === 10 &&
    unit.hasOwnProperty("hasCategory") &&
    unit.hasOwnProperty("categoryId") &&
    unit.hasOwnProperty("categoryOrderId") &&
    unit.hasOwnProperty("hasGroup") &&
    unit.hasOwnProperty("groupId") &&
    unit.hasOwnProperty("groupOrderId") &&
    unit.hasOwnProperty("id") &&
    unit.hasOwnProperty("number") &&
    unit.hasOwnProperty("name") &&
    unit.hasOwnProperty("role") &&
    typeof unit.hasCategory === "boolean" &&
    (typeof unit.categoryId === "string" || unit.categoryId === null) &&
    (typeof unit.categoryOrderId === "string" ||
      unit.categoryOrderId === null) &&
    typeof unit.hasGroup === "boolean" &&
    (typeof unit.groupId === "string" || unit.groupId === null) &&
    (typeof unit.groupOrderId === "string" || unit.groupOrderId === null) &&
    typeof unit.id === "string" &&
    typeof unit.number === "string" &&
    typeof unit.name === "string" &&
    typeof unit.role === "string"
  );
};
