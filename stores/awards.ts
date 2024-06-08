import { defineStore } from "pinia";

interface Award {
  id: number;
  title: string;
  date: Date;
  files: Array<string>;
  opened: boolean;
}

interface AwardsState {
  awards: Award[];
}

export const useAwardStore = defineStore("award", {
  state: (): AwardsState => ({
    awards: [],
  }),

  actions: {
    storeValues(values: Array<Award>) {
      this.awards = values;
    },
  },
});
