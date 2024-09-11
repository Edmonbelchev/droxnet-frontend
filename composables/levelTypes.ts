const retrieveLevelTypes = () => {
    return [
        { value: "entry", label: "Entry Level" },
        { value: "intermediate", label: "Intermediate" },
        { value: "expert", label: "Expert" }
    ]
}

const retrieveLevelTypeValue = (label: string) => {
    switch (label) {
        case "Entry Level":
            return "entry";
        case "Intermediate":
            return "intermediate";
        case "Expert":
            return "expert";
        default:
            return "entry";
    }
}

export { retrieveLevelTypes, retrieveLevelTypeValue };