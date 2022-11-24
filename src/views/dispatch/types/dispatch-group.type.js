export const groupIsValid = (group) => {
  return (
    Object.keys(group).length === 4 &&
    group.hasOwnProperty("categoryId") &&
    group.hasOwnProperty("categoryOrderId") &&
    group.hasOwnProperty("id") &&
    group.hasOwnProperty("size") &&
    typeof group.categoryId === "string" &&
    typeof group.categoryOrderId === "number" &&
    typeof group.id === "string" &&
    typeof group.size === "number"
  );
};