const retrieveJobTypes = () => {
  return [
    { value: "full_time", label: "Full Time" },
    { value: "part_time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "temporary", label: "Temporary" },
    { value: "internship", label: "Internship" },
    { value: "volunteer", label: "Volunteer" },
    { value: "remote", label: "Remote" },
  ];
};

const retrieveJobTypeValue = (label: string) => {
  switch (label) {
    case "Full Time":
      return "full_time";
    case "Part Time":
      return "part_time";
    case "Contract":
      return "contract";
    case "Temporary":
      return "temporary";
    case "Internship":
      return "internship";
    case "Volunteer":
      return "volunteer";
    case "Remote":
      return "remote";
    default:
      return "full_time";
  }
};

export { retrieveJobTypes, retrieveJobTypeValue };