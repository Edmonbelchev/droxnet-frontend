import { defineStore } from "pinia";

interface Experience {
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string;
  description: string;
  opened: boolean;
}

interface ExperiencesState {
  experiences: Experience[];
}

export const useExperienceStore = defineStore("experience", {
  state: (): ExperiencesState => ({
    experiences: [],
  }),

  actions: {
    storeValues(values: Array<Experience>) {
        this.experiences = values
    },
  },
});
