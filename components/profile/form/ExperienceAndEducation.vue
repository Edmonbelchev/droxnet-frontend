<script setup lang="ts">
import {
  required,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
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
const refreshExperienceComponent: Ref<Boolean> = ref(false);
const refreshEducationComponent: Ref<Boolean>  = ref(false);
/* Define two variables to determine if experience or education have changes */
const experiencesChanges: Ref<Boolean> = ref(false);
const educationsChanges: Ref<Boolean>  = ref(false);
/* Define two variables for loaded experiences and educations */
const experiencesLoaded: Ref<Boolean> = ref(false);
const educationsLoaded: Ref<Boolean>  = ref(false);
/* Define two variables for uploading experiences and educations */
const submittingExperiences: Ref<Boolean> = ref(false);
const submittingEducations: Ref<Boolean>  = ref(false);

const form: Ref = ref({
  experiences: [
    {
      id: null,
      company_name: "",
      job_title: "",
      start_date: "",
      end_date: "",
      description: "",
      opened: false,
    },
  ],
  educations: [
    {
      id: null,
      school_name: "",
      degree: "",
      field_of_study: "",
      start_date: "",
      end_date: "",
      description: "",
      opened: false,
    },
  ],
});

const updateForm = (data: Event, type: String = "experiences") => {
  form.value[type] = data;
};

const experienceRules = computed(() => {
  let ruleObj: Array<Object> = [];

  // Iterate over form values and add validation for each object
  form.value.experiences.forEach((item: any) => {
    ruleObj.push({
      company_name: {
        required: helpers.withMessage(
          "The company name field is required",
          required
        ),
      },
      job_title: {
        required: helpers.withMessage(
          "The job title field is required",
          required
        ),
      },
      start_date: {
        required: helpers.withMessage(
          "The start date field is required",
          required
        ),
      },
      end_date: {
        minValue: helpers.withMessage(
          `The minimum allowed date must be later than ${item.start_date}`,
          () => {
            if (
              item.end_date != null &&
              item.end_date != undefined &&
              item.end_date != ""
            ) {
              return new Date(item.end_date) > new Date(item.start_date);
            }

            return true;
          }
        ),
      },
      description: {
        minLength: helpers.withMessage(
          "The description field must be at least 64 characters",
          minLength(64)
        ),
        maxLength: helpers.withMessage(
          "The description field must be at most 512 characters",
          maxLength(512)
        ),
      },
    });
  });

  return ruleObj;
});

const educationRules = computed(() => {
  let ruleObj: Array<Object> = [];

  // Iterate over form values and add validation for each object
  form.value.educations.forEach((item: any) => {
    ruleObj.push({
      school_name: {
        required: helpers.withMessage(
          "The school name field is required",
          required
        ),
      },
      degree: {
        required: helpers.withMessage("The degree field is required", required),
      },
      field_of_study: {
        required: helpers.withMessage(
          "The field of study field is required",
          required
        ),
      },
      start_date: {
        required: helpers.withMessage(
          "The start date field is required",
          required
        ),
      },
      end_date: {
        minValue: helpers.withMessage(
          `The minimum allowed date must be later than ${item.start_date}`,
          () => {
            if (
              item.end_date != null &&
              item.end_date != undefined &&
              item.end_date != ""
            ) {
              return new Date(item.end_date) > new Date(item.start_date);
            }

            return true;
          }
        ),
      },
      description: {
        minLength: helpers.withMessage(
          "The description field must be at least 64 characters",
          minLength(64)
        ),
        maxLength: helpers.withMessage(
          "The description field must be at most 512 characters",
          maxLength(512)
        ),
      },
    });
  });

  return ruleObj;
});

let vExperience = useVuelidate(experienceRules, form.value.experiences);
let vEducation  = useVuelidate(educationRules, form.value.educations);

const submit = async () => {
  loading.value = true;

  vExperience.value.$validate();

  if(experiencesChanges.value) {
    if (!vExperience.value.$error) {
      submittingExperiences.value = true;

      const userExperienceResponse: any = await createUserExperience(
        form.value.experiences
      );
  
      if (userExperienceResponse.status.value === "success") {
        toast.success("Experiences updated successfully");
      } else {
        toast.error("Failed to update experiences");
      }
    } else {
      toast.error("Please fill in all required experience fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }

    submittingExperiences.value = false;
    experiencesChanges.value = false;
  }

  vEducation.value.$validate();

  if(educationsChanges.value) {
    if (!vEducation.value.$error) {
      submittingEducations.value = true;

      const userEducationResponse: any = await createUserEducation(
        form.value.educations
      );
  
      if (userEducationResponse.status.value === "success") {
        toast.success("Educations updated successfully");
      } else {
        toast.error("Failed to update educations");
      }
    } else {
      toast.error("Please fill in all required education fields", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }

    submittingEducations.value = false;
    educationsChanges.value = false;
  }

  loading.value = false;
};

// Watch for changes in experienceRules and update the validate method
watch(experienceRules, (value: Array<Object>) => {
  if (value) {
    refreshExperienceComponent.value = !refreshExperienceComponent.value;

    vExperience = useVuelidate(value, form.value.experiences);
  }
});

// Watch for changes in educationRules and update the validate method
watch(educationRules, (value: Array<Object>) => {
  if (value) {
    refreshEducationComponent.value = !refreshEducationComponent.value;

    vEducation = useVuelidate(value, form.value.educations);
  }
});

// Watch for changes in form.experiences and update the experiencesChanges variable
watch(() => form.value.experiences, (value: Array<Object>) => {
  if(experiencesLoaded.value) {
    experiencesChanges.value = true;
  }
}, { deep: true });

// Watch for changes in form.educations and update the educationsChanges variable
watch(() => form.value.educations, (value: Array<Object>) => {
  if(educationsLoaded.value) {
    educationsChanges.value = true;
  }
}, { deep: true });
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col p-4 md:p-6 gap-2">
    <ProfileFormExperience
      :user="user"
      :form="form.experiences"
      @update="updateForm($event)"
      :v$="vExperience"
      :refresh="refreshExperienceComponent"
      :loaded="experiencesLoaded"
      @loaded="experiencesLoaded = $event"
      :submitting="submittingExperiences"
    />

    <ProfileFormEducation
      :user="user"
      :form="form.educations"
      @update="updateForm($event, 'educations')"
      :v$="vEducation"
      :refresh="refreshEducationComponent"
      :loaded="educationsLoaded"
      @loaded="educationsLoaded = $event"
      :submitting="submittingEducations"
    />

    <div class="flex justify-end pb-2 p-4 w-full bg-white rounded-md">
      <button
        type="submit"
        class="primary-button uppercase flex gap-2 items-center"
        :class="loading || (!experiencesChanges && !educationsChanges) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
        :disabled="loading || (!experiencesChanges && !educationsChanges)"
      >
        Save & Update
        <Loader width="14" v-if="loading" />
      </button>
    </div>
  </form>
</template>