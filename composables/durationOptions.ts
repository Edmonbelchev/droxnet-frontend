const retrieveDurationOptions = () => {
  return [
    {
      value: "less_than_1_month",
      label: "Less than 1 month",
    },
    {
      value: "1_to_3_months",
      label: "1 to 3 months",
    },
    {
      value: "3_to_6_months",
      label: "3 to 6 months",
    },
    {
      value: "6_to_12_months",
      label: "6 to 12 months",
    },
    {
      value: "more_than_12_months",
      label: "More than 12 months",
    },
  ];
};

const retrieveDurationValue = (label: string) => {
  switch (label) {
    case "Less than 1 month":
      return "less_than_1_month";
    case "1 to 3 months":
      return "1_to_3_months";
    case "3 to 6 months":
      return "3_to_6_months";
    case "6 to 12 months":
      return "6_to_12_months";
    case "More than 12 months":
      return "more_than_12_months";
    default:
      return "less_than_1_month";
  }
};

export { retrieveDurationOptions, retrieveDurationValue };
