import { defineStore } from "pinia";

interface Project {
  title: string;
  url: string;
  files: Array<string>;
  opened: boolean;
}

interface ProjectsState {
  projects: Project[];
}

export const useProjectStore = defineStore("project", {
  state: (): ProjectsState => ({
    projects: [],
  }),

  actions: {
    storeValues(values: Array<Project>) {
      this.projects = values;
    },
  },
});
