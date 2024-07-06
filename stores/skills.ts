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
    accumulateSkills(newSkills: Array<Skill>) {
      const skillMap = new Map(this.skills.map(skill => [skill.id, skill]));
      
      newSkills.forEach(newSkill => {
        if (!skillMap.has(newSkill.id)) {
          this.skills.push(newSkill);
        }
      });
    }
  },
});
