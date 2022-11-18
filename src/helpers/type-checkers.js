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
    typeof unit.groupId === "string" &&
    typeof unit.id === "string" &&
    typeof unit.number === "string" &&
    typeof unit.name === "string" &&
    typeof unit.role === "string"
  );
};
