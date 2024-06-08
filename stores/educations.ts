import { defineStore } from "pinia";

interface Education {
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string;
  description: string;
  opened: boolean;
}

interface EducationsState {
  educations: Education[];
}

export const useEducationStore = defineStore("education", {
  state: (): EducationsState => ({
    educations: []
  }),

  actions: {
    storeValues(values: Array<Education>) {
        this.educations = values
    },
  },
});
