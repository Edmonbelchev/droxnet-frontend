<script setup lang="ts">
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
  v$: {
    type: Object,
    required: true,
  },
  job: {
    type: Object,
    required: true,
  },
});

const serviceLevelOptions = retrieveLevelTypes();

const jobTypeOptions = retrieveJobTypes();

const budgetTypeOptions = retrieveBudgetTypes()
  .filter((budgetType: any) => budgetType.value !== 'any');

const durationOptions = retrieveDurationOptions();

const selectedLanguages = ref([]);

const languageOptions = retrieveLanguages().map((language: any) => {
  return {
    value: language.code,
    label: language.name,
  };
});

onMounted(() => {
  if(props.form.languages) {
    selectedLanguages.value = languageOptions.filter(language => {
      if(props.form.languages.includes(language.value)) {
        return language;
      }
    });
  }

  watchEffect(() => {
    props.form.languages = selectedLanguages.value.map(
      (language: any) => language.value
    );
  });
})
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
          :error="v$.title.$error"
          :valid="!v$.title.$invalid"
          :errorMessages="v$.title.$errors"
          @touch="v$.title.$touch"
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
              :error="v$.level.$error"
              :valid="!v$.level.$invalid"
              :errorMessages="v$.level.$errors"
              @touch="v$.level.$touch"
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
              :error="v$.type.$error"
              :valid="!v$.type.$invalid"
              :errorMessages="v$.type.$errors"
              @touch="v$.type.$touch"
            />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 relative z-20">
          <div class="flex-1">
            <FormElementsSelect
              v-model="form.budget_type"
              :selectOptions="budgetTypeOptions"
              placeholder="Budget Type"
              name="type"
              selectClass="text-sm border p-4 rounded-md"
              optionClass="text-sm px-3 py-2 cursor-pointer hover:bg-gray-100/50 transition-all duration-200"
              wrapperClass="absolute top-13 flex flex-col bg-white rounded-b-md w-full max-h-0 overflow-y-scroll transition-all duration-200 shadow-lg"
              trailing="Budget Type:"
              :error="v$.budget_type.$error"
              :valid="!v$.budget_type.$invalid"
              :errorMessages="v$.budget_type.$errors"
              @touch="v$.budget_type.$touch"
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
              :error="v$.budget.$error"
              :valid="!v$.budget.$invalid"
              :errorMessages="v$.budget.$errors"
              @touch="v$.budget.$touch"
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
              :error="v$.duration.$error"
              :valid="!v$.duration.$invalid"
              :errorMessages="v$.duration.$errors"
              @touch="v$.duration.$touch"
            />
          </div>

          <div class="w-full sm:w-1/2 sm:max-w-[320px]">
            <FormElementsMultiSelect
              v-model="selectedLanguages"
              :options="languageOptions"
              placeholder="Languages"
              name="languages"
              className="bg-white cursor-pointer min-h-[46px] sm:min-h-[52px] flex gap-2 items-center justify-between w-full border rounded-md p-4 max-h-[54px]"
              :error="v$.languages.$error"
              :valid="!v$.languages.$invalid"
              :errorMessages="v$.languages.$errors"
              @touch="v$.languages.$touch"
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
              :error="v$.location.$error"
              :valid="!v$.location.$invalid"
              :errorMessages="v$.location.$errors"
              @touch="v$.location.$touch"
            />
          </div>

          <div class="flex-1">
            <FormElementsCountrySelect
              v-model="form.country"
              placeholder="Select Country"
              name="country"
              :selectedOption="form.country"
              :error="v$.country.$error"
              :valid="!v$.country.$invalid"
              :errorMessages="v$.country.$errors"
              @touch="v$.country.$touch"
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
          :error="v$.description.$error"
          :valid="!v$.description.$invalid"
          :errorMessages="v$.description.$errors"
          @touch="v$.description.$touch"
        />
      </div>

      <JobsSkills
        :addedSkills="form.skills"
        :selectedSkills="job.skills"
        @updateForm="form.skills = $event"
        v-if="job"
      />

      <JobsSkills
        :addedSkills="form.skills"
        @updateForm="form.skills = $event"
        v-else
      />

      <div class="flex flex-col sm:flex-row justify-between bg-[--background-color] text-[--text-color] border-l-4 border-[--primary-color] py-3 px-4 my-4">
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