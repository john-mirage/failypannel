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

export const groupsAreValid = (groups) => {
  return (
    Array.isArray(groups) &&
    groups.every((group) => groupIsValid(group))
  );
}

export const groupsAreTheSame = (oldGroup, newGroup) => {
  if (groupsAreValid([oldGroup, newGroup])) {
    return (
      oldGroup.categoryId === newGroup.categoryId &&
      oldGroup.categoryOrderId === newGroup.categoryOrderId &&
      oldGroup.id === newGroup.id &&
      oldGroup.size === newGroup.size
    );
  } else {
    throw new Error("The groups are not valid");
  }
}