import { defineStore } from "pinia";

interface Skill {
  value: Number;
  label: String;
}

interface SkillsState {
  skills: Skill[];
  userSkills: Skill[];
}

export const useSkillStore = defineStore("skill", {
  state: (): SkillsState => ({
    skills: [],
    userSkills: []
  }),

  actions: {
    storeValues(values: Array<Skill>, userSkills: Boolean = false) {
      if(userSkills) 
        this.userSkills = values;
      else
        this.skills = values;
    },
  },
});
