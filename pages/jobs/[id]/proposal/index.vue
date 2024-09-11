<script setup lang="ts">
import {
  required,
  numeric,
  helpers,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

definePageMeta({
  middleware: "auth",
  breadcrumb: "Job Proposal",
});

const route: any = useRoute();
const router: any = useRouter();
const toast: any = useNuxtApp().$toast;

const job = ref();
const loading = ref(false);
const loadingJob = ref(true);

const form: Ref<Object> = ref({
  job_id: route.params.id,
  subject: null,
  description: null,
  price: null,
  duration: null,
  duration_type: "days", // Default to days
  files: [],
});

const durationTypes = durationTypeOptions();

const retrieveJob = async () => {
  const response = await fetchJob(route.params.id);

  if (response.status.value === "success") {
    job.value = response.data.value.data;
  }

  loadingJob.value = false;
};

const rules = computed(() => {
  return {
    price: {
      required: helpers.withMessage(
        "The proposal amount field is required",
        required
      ),
      numeric: helpers.withMessage(
        "The proposal amount field must be a number",
        numeric
      ),
    },
    subject: {
      required: helpers.withMessage("The subject field is required", required),
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
        "The description field must be at most 1024 characters",
        maxLength(1024)
      ),
    },
    duration: {
      required: helpers.withMessage("The duration field is required", required),
      numeric: helpers.withMessage(
        "The duration field must be a number",
        numeric
      ),
    },
    duration_type: {
      required: helpers.withMessage(
        "The duration type field is required",
        required
      ),
    },
  };
});

const v$ = useVuelidate(rules, form.value);

const submit = async () => {
  loading.value = true;

  v$.value.$validate();

  if (!v$.value.$error) {
    const response = await createProposal(form.value);

    if (response.status.value === "success") {
      toast.success("Proposal created successfully");
      // Redirect to the job page
      router.push(`/jobs/${route.params.id}`);
    } else {
      toast.error(response.error, {
        autoClose: false,
      });
    }
  } else {
    toast.error("Please fill in the required fields");
  }

  loading.value = false;
};

onMounted(() => {
  retrieveJob();
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="bg-gray-100 min-h-screen">
      <AppBreadcrumbs title="Job Proposal" />

      <SkeletonJobProposal v-if="loadingJob" />

      <div class="p-4 md:p-20" v-else>
        <div class="max-w-[730px] w-full mx-auto flex flex-col gap-8">
          <div
            class="p-4 md:p-8 rounded-lg flex bg-white justify-between items-center gap-4"
          >
            <div class="flex flex-col gap-4">
              <h1
                class="text-[20px] md:text-[28px] leading-10 text-[--text-color] font-bold"
              >
                {{ job.title }}
              </h1>

              <div class="flex flex-col sm:flex-row">
                <div
                  class="sm:mr-3 sm:pr-3 sm:border-r flex gap-1 items-center"
                  v-if="job.level"
                >
                  <Icon
                    name="lucide:dollar-sign"
                    class="text-[--green-color]"
                  />
                  <span>{{ job.level }}</span>
                </div>

                <div
                  class="sm:mr-3 sm:pr-3 sm:border-r flex gap-1 items-center"
                  v-if="job.country"
                >
                  <img
                    :src="countryFlag(job.country)"
                    :alt="job.country"
                    class="w-[18px]"
                  />
                  <span>{{ job.location }}</span>
                </div>

                <div
                  class="sm:mr-3 sm:pr-3 sm:border-r flex gap-1 items-center"
                  v-if="job.type"
                >
                  <Icon
                    name="material-symbols:folder-outline"
                    class="text-blue-500"
                  />
                  <span>Type: {{ job.type }}</span>
                </div>

                <div class="flex gap-1 items-center" v-if="job.duration">
                  <Icon name="ph:clock" class="text-[--primary-color]" />
                  <span>Duration: {{ job.duration }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-lg flex flex-col bg-white">
            <h4 class="p-4 md:p-8 text-[--text-color] text-base md:text-lg">
              Proposal Details
            </h4>

            <form class="flex flex-col" @submit.prevent="submit()">
              <div
                class="flex flex-col gap-2 bg-[--background-color] p-4 md:p-8"
              >
                <FormElementsInput
                  v-model="form.price"
                  type="number"
                  placeholder="Enter Your Proposal Amount"
                  name="price"
                  icon="lucide:dollar-sign"
                  iconClass="absolute right-4 top-0 bottom-0 h-full text-[--green-color] text-lg"
                  :error="v$.price.$error"
                  :valid="!v$.price.$invalid"
                  :errorMessages="v$.price.$errors"
                  @touch="v$.price.$touch"
                />

                <span class="italic text-xs mb-2"
                  >Total amount the client will see on your proposal</span
                >

                <div
                  class="flex justify-between items-center pb-4 mb-2 border-b"
                >
                  <span class="w-2/5">
                    (<Icon
                      name="lucide:dollar-sign"
                      class="text-[--green-color] md:text-lg"
                    />) -
                    <strong class="text-[--text-color]">00.00</strong>
                  </span>

                  <span class="text-xs w-3/4 text-right">
                    <strong>"Worktern"</strong> Service Fee
                  </span>
                </div>

                <div class="flex justify-between items-center">
                  <span class="w-2/5">
                    (<Icon
                      name="lucide:dollar-sign"
                      class="text-[--green-color] md:text-lg"
                    />) - <strong class="text-[--text-color]">00.00</strong>
                  </span>

                  <span class="text-xs w-3/4 text-right">
                    Amount You'll Receive after
                    <strong>"Worktern"</strong> Service Fee deduction
                  </span>
                </div>
              </div>

              <div class="p-4 md:p-8 flex flex-col gap-4">
                <FormElementsInput
                  v-model="form.subject"
                  type="text"
                  placeholder="Enter Your Proposal Subject"
                  name="subject"
                  :error="v$.subject.$error"
                  :valid="!v$.subject.$invalid"
                  :errorMessages="v$.subject.$errors"
                  @touch="v$.subject.$touch"
                />

                <FormElementsTextarea
                  v-model="form.description"
                  placeholder="Enter Your Proposal Description"
                  name="Add Description*"
                  :error="v$.description.$error"
                  :valid="!v$.description.$invalid"
                  :errorMessages="v$.description.$errors"
                  @touch="v$.description.$touch"
                />

                <!-- Updated duration input with separate number input and select for type -->
                <div class="flex flex-col gap-2">
                  <label class="text-sm font-medium text-gray-700"
                    >Project Duration</label
                  >
                  <div class="flex gap-2 relative z-10">
                    <div class="w-4/5">
                      <FormElementsInput
                        v-model="form.duration"
                        type="number"
                        placeholder="Enter duration"
                        name="duration"
                        :error="v$.duration.$error"
                        :valid="!v$.duration.$invalid"
                        :errorMessages="v$.duration.$errors"
                        @touch="v$.duration.$touch"
                        inputClass="px-4 py-2 min-h-[46px] sm:min-h-[50px] rounded border focus:border-[--primary-color] transition-all duration-300"
                      />
                    </div>

                    <div class="w-1/5">
                      <FormElementsSelect
                        v-model="form.duration_type"
                        :selectOptions="durationTypes"
                        name="durationType"
                        selectClass="w-2/5 z-10 p-3 rounded-md min-h-[46px] sm:min-h-[50px]"
                        optionClass="text-sm border-b p-3"
                        :error="v$.duration_type.$error"
                        :valid="!v$.duration_type.$invalid"
                        :errorMessages="v$.duration_type.$errors"
                        @touch="v$.duration_type.$touch"
                      />
                    </div>
                  </div>
                </div>

                <div class="flex justify-between">
                  <h4 class="text-[--text-color] text-base md:text-lg">
                    Upload File (Optional)
                  </h4>

                  <button
                    type="button"
                    class="text-[--light-blue] flex items-center gap-1"
                  >
                    <Icon name="et:attachments" class="text-[--light-blue]" />
                    <span class="text-xs"> Attach File(s) </span>
                  </button>
                </div>

                <div class="flex flex-col gap-2 mb-4">
                  <FormElementsMultipleFileUpload
                    v-model="form.files"
                    :previewFiles="form.files"
                    name="files[]"
                    id="files"
                  />
                </div>

                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="primary-button min-w-[210px] h-fit"
                    :class="
                      loading
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                    "
                  >
                    <div
                      v-if="loading"
                      class="flex items-center justify-center gap-2"
                    >
                      Sending...
                      <Loader
                        width="14"
                        height="14"
                        strokeWidth="8"
                        color="text-gray-600"
                      />
                    </div>

                    <span v-else> Send proposal </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>