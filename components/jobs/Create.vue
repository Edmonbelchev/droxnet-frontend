<script setup lang="ts">
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const serviceLevelOptions = [
  { value: "entry", label: "Entry Level" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert", label: "Expert" },
];

const jobTypeOptions = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "temporary", label: "Temporary" },
  { value: "internship", label: "Internship" },
  { value: "volunteer", label: "Volunteer" },
  { value: "remote", label: "Remote" },
];

const budgetTypeOptions = [
  { value: "fixed", label: "Fixed Price" },
  { value: "hourly", label: "Hourly Rate" },
];

const durationOptions = [
  {
    value: "less_than_1_month",
    label: "Less than 1 month",
  },
  {
    value: "1_to_3_months",
    label: "1 to 3 months",
  },
  {
    value: "3_to_6_months",
    label: "3 to 6 months",
  },
  {
    value: "6_to_12_months",
    label: "6 to 12 months",
  },
  {
    value: "more_than_12_months",
    label: "More than 12 months",
  },
];

const selectedLanguages = ref([]);

const languageOptions = retrieveLanguages().map((language: any) => {
  return {
    value: language.code,
    label: language.name,
  };
});

watchEffect(() => {
  props.form.languages = selectedLanguages.value.map(
    (language: any) => language.value
  );
});
</script>

<template>
  <div
    class="flex flex-col max-w-[730px] mx-auto shadow-lg bg-white rounded-md"
  >
    <div class="flex flex-col rounded-md w-full">
      <h2 class="border-b p-4 md:p-6 text-[--text-color] text-base md:text-lg">
        Post a job
      </h2>
    </div>

    <div class="flex flex-col p-4 md:p-6 gap-2">
      <h4
        class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
      >
        Job Details
      </h4>

      <div class="px-4 flex flex-col gap-2 mb-4">
        <FormElementsInput
          v-model="form.title"
          type="text"
          placeholder="Job Title"
          name="title"
        />

        <div class="relative z-30 flex flex-col sm:flex-row gap-2">
          <div class="flex-1">
            <FormElementsSelect
              v-model="form.level"
              :selectOptions="serviceLevelOptions"
              placeholder="Service Level"
              name="level"
              selectClass="text-sm border p-4 rounded-md"
              optionClass="text-sm px-3 py-2 cursor-pointer hover:bg-gray-100/50 transition-all duration-200"
              wrapperClass="absolute top-13 flex flex-col bg-white rounded-b-md w-full max-h-0 overflow-y-scroll transition-all duration-200 shadow-lg"
              trailing="Service Level:"
            />
          </div>

          <div class="flex-1">
            <FormElementsSelect
              v-model="form.type"
              :selectOptions="jobTypeOptions"
              placeholder="Job Type"
              name="type"
              selectClass="text-sm border p-4 rounded-md"
              optionClass="text-sm px-3 py-2 cursor-pointer hover:bg-gray-100/50 transition-all duration-200"
              wrapperClass="absolute top-13 flex flex-col bg-white rounded-b-md w-full max-h-0 overflow-y-scroll transition-all duration-200 shadow-lg"
              trailing="Job Type:"
            />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 relative z-20">
          <div class="flex-1">
            <FormElementsSelect
              v-model="form.type"
              :selectOptions="budgetTypeOptions"
              placeholder="Budget Type"
              name="type"
              selectClass="text-sm border p-4 rounded-md"
              optionClass="text-sm px-3 py-2 cursor-pointer hover:bg-gray-100/50 transition-all duration-200"
              wrapperClass="absolute top-13 flex flex-col bg-white rounded-b-md w-full max-h-0 overflow-y-scroll transition-all duration-200 shadow-lg"
              trailing="Budget Type:"
            />
          </div>

          <div class="flex-1">
            <FormElementsInput
              v-model="form.budget"
              type="text"
              placeholder="Job Budget"
              name="budget"
              icon="lucide:dollar-sign"
              iconClass="absolute top-0 right-3 h-full text-lg text-gray-400"
            />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 relative z-10">
          <div class="w-full sm:w-1/2">
            <FormElementsSelect
              v-model="form.duration"
              :selectOptions="durationOptions"
              placeholder="Job Duration"
              name="type"
              selectClass="text-sm border p-4 rounded-md"
              optionClass="text-sm px-3 py-2 cursor-pointer hover:bg-gray-100/50 transition-all duration-200"
              wrapperClass="absolute top-13 flex flex-col bg-white rounded-b-md w-full max-h-0 overflow-y-scroll duration-200 shadow-lg"
              trailing="Job Duration:"
            />
          </div>

          <div class="w-full sm:w-1/2 sm:max-w-[320px]">
            <FormElementsMultiSelect
              v-model="selectedLanguages"
              :options="languageOptions"
              placeholder="Languages"
              name="languages"
              className="bg-white cursor-pointer min-h-[46px] sm:min-h-[52px] flex gap-2 items-center justify-between w-full border rounded-md p-4 max-h-[54px]"
            />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2">
          <div class="flex-1">
            <FormElementsInput
              v-model="form.location"
              type="text"
              placeholder="Location"
              name="location"
            />
          </div>

          <div class="flex-1">
            <FormElementsCountrySelect
              v-model="form.country"
              placeholder="Select Country"
              name="country"
              :selectedOption="form.country"
            />
          </div>
        </div>
      </div>

      <h4
        class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
      >
        Job Description
      </h4>

      <div class="px-4 flex flex-col gap-2 mb-4">
        <FormElementsCKEditor
          v-model="form.description"
          placeholder="Job Description"
          name="description"
        />
      </div>

      <JobsSkills
        :addedSkills="form.skills"
        @updateForm="form.skills = $event"
      />

      <div class="flex justify-between bg-[--background-color] text-[--text-color] border-l-4 border-[--primary-color] py-3 px-4 my-4">
        <h4
          class="text-base"
        >
          Attachments
        </h4>

        <div class="flex gap-2">
          <FormElementsToggle
            v-model="form.show_attachments"
            label="Show “Attachments” after hiring"
          />
        </div>
      </div>

      <div class="px-4 flex flex-col gap-2 mb-4">
        <FormElementsMultipleFileUpload
          v-model="form.files"
          :previewFiles="form.files"
          name="files[]"
          id="files"
        />
      </div>
    </div>
  </div>
</template>