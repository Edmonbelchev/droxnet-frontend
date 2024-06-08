<script setup lang="ts">
import { required, url, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const toast: any = useNuxtApp().$toast;
const loading: Ref<Boolean> = ref(false);
/* Define two components for re-rendering */
const refreshProjectComponent: Ref<Boolean> = ref(false);
const refreshAwardComponent: Ref<Boolean> = ref(false);
/* Define two variables to determine if project or award have changes */
const projectsChanges: Ref<Boolean> = ref(false);
const awardsChanges: Ref<Boolean> = ref(false);
/* Define two variables for loaded projects and awards */
const projectsLoaded: Ref<Boolean> = ref(false);
const awardsLoaded: Ref<Boolean> = ref(false);
/* Define two variables for uploading projects and awards */
const submittingProjects: Ref<Boolean> = ref(false);
const submittingAwards: Ref<Boolean> = ref(false);

const form: Ref = ref({
  projects: [
    {
      id: null,
      title: "",
      url: "",
      files: [],
      opened: false,
    },
  ],
  awards: [
    {
      id: null,
      title: "",
      date  : "",
      files: [],
      opened: false,
    },
  ],
});

const updateForm = (data: Event, type: String = "projects") => {
  form.value[type] = data;
};

const projectRules = computed(() => {
  let ruleObj: Array<Object> = [];

  // Iterate over form values and add validation for each object
  form.value.projects.forEach(() => {
    ruleObj.push({
      title: {
        required: helpers.withMessage("The Title field is required", required),
      },
      url: {
        // Set helper message to address that the url should starts http or https
        url: helpers.withMessage(
          "The URL should start with http or https",
          url
        ),
      },
    });
  });

  return ruleObj;
});

const awardRules = computed(() => {
  let ruleObj: Array<Object> = [];

  // Iterate over form values and add validation for each object
  form.value.awards.forEach((item: any) => {
    ruleObj.push({
      title: {
        required: helpers.withMessage("The Title field is required", required),
      },
      date: {
        maxValue: helpers.withMessage(
          `The maximum allowed date must be before ${new Date().toISOString().split('T')[0]}`,
          () => {
            return new Date(item.date) <= new Date() ? true : false;
          }
        ),
      },
    });
  });

  return ruleObj;
});

let vProject = useVuelidate(projectRules, form.value.projects);
let vAward   = useVuelidate(awardRules, form.value.awards);

const submit = async () => {
  loading.value = true;

  // Validate the form
  vProject.value.$touch();

  // Check if there are changes in the projects
  if(projectsChanges.value){
    if (!vProject.value.$error) {
      submittingProjects.value = true;

      const userProjectResponse: any = await createUserProject(
        form.value.projects
      );

      if (userProjectResponse.status.value === "success") {
        toast.success("Projects updated successfully");
      } else {
        toast.error("Failed to update projects");
      }
    } else {
      toast.error("Please fill in all required project fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }

    submittingProjects.value = false;
    projectsChanges.value = false;
  }

  // Validate the form
  vAward.value.$touch();

  if(awardsChanges.value) {
    // Check if there are changes in the awards
    if (!vAward.value.$error) {
      submittingAwards.value = true;

      const userAwardResponse: any = await createUserAward(
        form.value.awards
      );
  
      if (userAwardResponse.status.value === "success") {
        toast.success("Awards updated successfully");
      } else {
        toast.error("Failed to update awards");
      }
    } else {
      toast.error("Please fill in all required award fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  
    submittingAwards.value = false;
    awardsChanges.value = false;
  }

  loading.value = false;
};

// Watch for changes in projectRules and update the validate method
watch(projectRules, (value: Array<Object>) => {
  if (value) {
    refreshProjectComponent.value = !refreshProjectComponent.value;

    vProject = useVuelidate(value, form.value.projects);
  }
});

// Watch for changes in form.projects and update the projectsChanges variable
watch(() => form.value.projects, (value: Array<Object>) => {
  if(projectsLoaded.value) {
    projectsChanges.value = true;
  }
}, { deep: true });

// Watch for changes in awardRules and update the validate method
watch(awardRules, (value: Array<Object>) => {
  if (value) {
    refreshAwardComponent.value = !refreshAwardComponent.value;

    vAward = useVuelidate(value, form.value.awards);
  }
});

// Watch for changes in form.awards and update the awardsChanges variable
watch(() => form.value.awards, (value: Array<Object>) => {
  if(awardsLoaded.value) {
    awardsChanges.value = true;
  }
}, { deep: true });
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col p-4 md:p-6 gap-2">
    <ProfileFormProjects
      :user="user"
      :form="form.projects"
      @update="updateForm($event)"
      :v$="vProject"
      :refresh="refreshProjectComponent"
      :loaded="projectsLoaded"
      @loaded="projectsLoaded = $event"
      :submitting="submittingProjects"
    />

    <ProfileFormAwards
      :user="user"
      :form="form.awards"
      @update="updateForm($event, 'awards')"
      :v$="vAward"
      :refresh="refreshAwardComponent"
      :loaded="awardsLoaded"
      @loaded="awardsLoaded = $event"
      :submitting="submittingAwards"
    />

    <div class="flex justify-end pb-2 p-4 w-full bg-white rounded-md">
      <button
        type="submit"
        class="primary-button uppercase flex gap-2 items-center"
        :class="loading || (!projectsChanges && !awardsChanges) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
        :disabled="loading || (!projectsChanges && !awardsChanges)"
      >
        Save & Update
        <Loader width="14" v-if="loading" />
      </button>
    </div>
  </form>
</template>