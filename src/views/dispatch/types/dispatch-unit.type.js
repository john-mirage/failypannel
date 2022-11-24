export const unitIsValid = (unit) => {
  return (
    Object.keys(unit).length === 7 &&
    unit.hasOwnProperty("parentType") &&
    unit.hasOwnProperty("parentId") &&
    unit.hasOwnProperty("parentOrderId") &&
    unit.hasOwnProperty("id") &&
    unit.hasOwnProperty("number") &&
    unit.hasOwnProperty("name") &&
    unit.hasOwnProperty("role") &&
    typeof unit.parentType === "string" &&
    typeof unit.parentId === "string" &&
    typeof unit.parentOrderId === "number" &&
    typeof unit.id === "string" &&
    typeof unit.number === "string" &&
    typeof unit.name === "string" &&
    typeof unit.role === "string"
  );
};