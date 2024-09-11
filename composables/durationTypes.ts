const durationTypeOptions = () => {
  return [
    {
      value: "days",
      label: "Days",
      singular: "Day",
    },
    {
      value: "weeks",
      label: "Weeks",
      singular: "Week",
    },
    {
      value: "months",
      label: "Months",
      singular: "Month",
    },
  ];
};

const getDurationType = (key: string, numberValue: number) => {
  return numberValue === 1 
    ? durationTypeOptions().find((type) => type.value === key).singular
    : durationTypeOptions().find((type) => type.value === key).label
};

export { durationTypeOptions, getDurationType };
