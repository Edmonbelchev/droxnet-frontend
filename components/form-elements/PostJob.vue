<script setup lang="ts">
import {
  required,
  numeric,
  helpers,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const props = defineProps({
  job: {
    type: Object,
  },
  jobHasLoaded: {
    type: Boolean,
    default: true,
  },
});

const router = useRouter();
const toast: any = useNuxtApp().$toast;

const form: Ref<Object | any> = ref({
  title: "",
  description: "",
  level: "",
  type: "",
  budget: "",
  budget_type: "",
  duration: "",
  skills: [],
  languages: [],
  location: "",
  files: [],
  show_attachments: false,
});
const loading: Ref<boolean> = ref(false);

const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage("The title field is required", required),
      minLength: helpers.withMessage(
        "The title field must be at least 8 characters",
        minLength(8)
      ),
      maxLength: helpers.withMessage(
        "The title field must be at most 255 characters",
        maxLength(255)
      ),
    },
    budget: {
      required: helpers.withMessage("The budget field is required", required),
      numeric: helpers.withMessage(
        "The budget field must be a number",
        numeric
      ),
    },
    description: {
      required: helpers.withMessage(
        "The description field is required",
        required
      ),
      minLength: helpers.withMessage(
        "The description field must be at least 32 characters",
        minLength(32)
      ),
      maxLength: helpers.withMessage(
        "The description field must be at most 4096 characters",
        maxLength(4096)
      ),
    },
    level: {
      required: helpers.withMessage("The level field is required", required),
    },
    type: {
      required: helpers.withMessage("The type field is required", required),
    },
    budget_type: {
      required: helpers.withMessage(
        "The budget type field is required",
        required
      ),
    },
    duration: {
      required: helpers.withMessage("The duration field is required", required),
    },
    skills: {
      required: helpers.withMessage("The skills field is required", required),
    },
    languages: {
      required: helpers.withMessage(
        "The languages field is required",
        required
      ),
    },
    location: {
      required: helpers.withMessage("The location field is required", required),
    },
    country: {
      required: helpers.withMessage("The country field is required", required),
    },
  };
});

let v$ = useVuelidate(rules, form.value);

const submit = async () => {
  loading.value = true;

  v$.value.$validate();
  console.log(v$.value.$error);
  if (!v$.value.$error) {
    let response;

    if (props.job) {
      response = await updateJob(form.value, props.job.id);
    } else {
      response = await createJob(form.value);
    }

    if (response.status.value === "success") {
      // Redirect to the job page
      toast.success(
        props.job ? "Job updated successfully" : "Job created successfully"
      );

      router.push(`/jobs/${response.data.value.data.id}`);
    } else {
      toast.error(response.error, {
        autoClose: false,
      });
    }
  } else {
    toast.error("Please fill in all required fields");
  }

  loading.value = false;
};

const updateFormFromJob = () => {
  if (props.job) {
    form.value = {
      title: props.job.title,
      description: props.job.description,
      level: retrieveLevelTypeValue(props.job.level),
      type: retrieveJobTypeValue(props.job.type),
      budget: props.job.budget,
      budget_type: retrieveBudgetTypeValue(props.job.budget_type),
      duration: retrieveDurationValue(props.job.duration),
      skills: props.job.skills.map((skill) => skill.id),
      files: props.job.files.map((file) => file.url),
      location: props.job.location,
      country: props.job.country,
      languages: props.job.languages,
      show_attachments: props.job.show_attachments
    };
  }
};

watch(() => props.jobHasLoaded, (value: boolean) => {
  if(value) {
        updateFormFromJob();
        // Re-initialize vuelidate after form update
        v$ = useVuelidate(rules, form.value)
    }
}, { immediate: true });
</script>

<template>
  <form
    @submit.prevent="submit"
    class="bg-[--background-color] py-8 px-4 md:py-10 md:px-16 md:min-h-[1200px]"
  >
    <div v-if="!jobHasLoaded">
        <SkeletonPostJob />
    </div>

    <div v-else>
      <JobsCreate :form="form" :job="job" class="mb-4" :v$="v$" />

      <div
        class="p-6 flex flex-wrap gap-4 justify-between items-center max-w-[730px] mx-auto shadow-lg bg-white rounded-md"
      >
        <h4 class="md:text-base text-[--text-color]" v-if="job">
          Update job by just clicking on “Update” button.
        </h4>

        <h4 class="md:text-base text-[--text-color]" v-else>Post job by just clicking on “Post Job Now” button.</h4>

        <button
          type="submit"
          class="w-full justify-center sm:w-fit primary-button uppercase flex gap-2 items-center"
          :class="loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
          :disabled="loading"
        >
          <span v-if="job"> Update </span>
          <span v-else>Post Job Now</span>
          <Loader width="14" v-if="loading" />
        </button>
      </div>
    </div>
  </form>
</template>