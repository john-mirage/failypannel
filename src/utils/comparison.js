export const compareTwoNumbers = (numberA, numberB) => {
  if (typeof numberA === "number" && typeof numberB === "number") {
    return numberA - numberB;
  } else {
    throw new Error("The two arguments are not numbers");
  }
}