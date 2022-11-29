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

export const unitsAreValid = (units) => {
  return (
    Array.isArray(units) &&
    units.every((unit) => unitIsValid(unit))
  );
}

export const unitsAreTheSame = (oldUnit, newUnit) => {
  if (unitsAreValid([oldUnit, newUnit])) {
    return (
      oldUnit.parentType === newUnit.parentType &&
      oldUnit.parentId === newUnit.parentId &&
      oldUnit.parentOrderId === newUnit.parentOrderId &&
      oldUnit.id === newUnit.id &&
      oldUnit.number === newUnit.number &&
      oldUnit.name === newUnit.name &&
      oldUnit.role === newUnit.role
    );
  } else {
    throw new Error("The groups are not valid");
  }
}