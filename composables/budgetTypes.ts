const retrieveBudgetTypes = () => {
  return [
    { value: "any", label: "Any Project Type" },
    { value: "fixed", label: "Fixed Price Project" },
    { value: "hourly", label: "Hourly Based Project" },
  ];
};

const retrieveBudgetTypeValue = (label: string) => {
  // Switch case values are the same as the values from the API
  switch (label) {
    case "Hourly Rate":
      return "hourly";
    case "Fixed Price":
      return "fixed";
    default:
      return "any";
  }
}

export { retrieveBudgetTypes, retrieveBudgetTypeValue };