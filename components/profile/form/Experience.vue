<script setup lang="ts">
const props: any = defineProps({
  user: {
    type: Object,
    required: true,
  },
  form: {
    type: Array,
    required: true,
  },
  v$: {
    type: Object,
    required: true,
  },
  loaded: {
    type: Boolean,
    required: true,
  },
  submitting: {
    type: Boolean,
  },
});

const emit = defineEmits(["update", "loaded"]);
const experienceStore = useExperienceStore();

const retrieveUserExperiences = async () => {
  const response: any = await fetchUserExperiences(props.user.id);

  if (response.status.value === "success") {
    const result = response.data.value.data.map((experience: any) => {
      return {
        id: experience.id,
        company_name: experience.company_name,
        job_title: experience.job_title,
        start_date: experience.start_date,
        end_date: experience.end_date,
        description: experience.description,
        opened: false,
      };
    });

    // Update the experience store
    experienceStore.storeValues(result);

    emit("update", result);

    setTimeout(() => {
      emit("loaded", true);
    }, 100);
  }
};

const addExperience = () => {
  props.form.push({
    id: null,
    company_name: "",
    job_title: "",
    start_date: "",
    end_date: "",
    description: "",
    opened: false,
  });

  // Update the experience store
  experienceStore.storeValues(props.form);
};

const removeExperience = (index: Number) => {
  props.form.splice(index, 1);

  // Update the experience store
  experienceStore.storeValues(props.form);
};

onMounted(async () => {
  // If experience store have value, load the data from it
  if (experienceStore.experiences.length > 0) {
    emit("update", experienceStore.experiences);
    emit("loaded", true);
  } else {
    await retrieveUserExperiences();
  }
});
</script>

<template>
  <div class="mb-2" v-if="loaded">
    <div
      class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base flex justify-between"
    >
      <div class="flex items-center">
        <div class="flex items-center gap-2" v-if="submitting">
          <Loader width="16" />
          <h4>Submitting...</h4>
        </div>

        <h4 v-else>Add Your Experience</h4>
      </div>

      <button
        type="button"
        class="text-blue-400 text-sm font-medium"
        @click="addExperience()"
        v-if="!submitting"
      >
        Add new
      </button>
    </div>

    <div class="sm:px-4" v-for="(item, index) in form" :key="index">
      <div
        class="p-3 sm:py-4 sm:px-6 border-x border-t rounded-sm flex justify-between sm:items-center rounded-t-sm gap-2"
        :class="{
          'border-red-500': !item.opened && v$[index].$error,
          'rounded-t-md': index === 0,
          'rounded-b-md border-b': index === form.length - 1 && !item.opened,
          'border-b': item.opened,
        }"
      >
        <div
          class="flex flex-wrap gap-1 text-[--text-color] sm:items-center"
          v-if="item.job_title"
        >
          {{ item.job_title }}

          <span class="text-xs text-[--gray-color]" v-if="item.start_date">
            ({{ item.start_date }}
            <span v-if="item.end_date"> - {{ item.end_date }}) </span>
            <span v-else> - Present) </span>
          </span>
        </div>

        <div v-else>
          <p class="text-[--gray-color]">No experience added yet</p>
        </div>

        <div class="flex gap-2">
          <button
            type="button"
            class="text-[--text-color] flex items-center justify-center bg-[--light-blue] w-8 h-8 text-white rounded-[3px] text-xs hover:bg-[--primary-color] duration-300"
            @click="item.opened = !item.opened"
          >
            <Icon name="fa-solid:pen" />
          </button>

          <button
            type="button"
            class="text-white flex items-center justify-center w-8 h-8 rounded-[3px] bg-[--primary-color] hover:bg-orange-600 duration-300"
            @click="removeExperience(index)"
          >
            <Icon name="fa-solid:trash" />
          </button>
        </div>
      </div>

      <div
        class="overflow-hidden transition-all duration-300"
        :class="item.opened ? 'max-h-[999px]' : 'max-h-0'"
      >
        <div
          class="flex flex-col gap-2 p-4 sm:p-6 bg-[--background-color] overflow-hidden"
          :class="{ 'rounded-b-md': index === form.length - 1 }"
        >
          <FormElementsInput
            v-model="item.company_name"
            type="text"
            placeholder="Company Title"
            :error="v$[index].company_name.$error"
            :valid="!v$[index].company_name.$invalid"
            :errorMessages="v$[index].company_name.$errors"
            @touch="v$[index].company_name.$touch"
          />

          <FormElementsInput
            v-model="item.job_title"
            type="text"
            placeholder="Your Job Title"
            name="job_title"
            :error="v$[index].job_title.$error"
            :valid="!v$[index].job_title.$invalid"
            :errorMessages="v$[index].job_title.$errors"
            @touch="v$[index].job_title.$touch"
          />

          <div class="flex flex-col sm:flex-row gap-2">
            <FormElementsInput
              v-model="item.start_date"
              type="date"
              placeholder="Start Date"
              name="start_date"
              :error="v$[index].start_date.$error"
              :valid="!v$[index].start_date.$invalid"
              :errorMessages="v$[index].start_date.$errors"
              @touch="v$[index].start_date.$touch"
            />

            <FormElementsInput
              v-model="item.end_date"
              type="date"
              placeholder="End Date"
              name="end_date"
              :error="v$[index].end_date.$error"
              :valid="!v$[index].end_date.$invalid"
              :errorMessages="v$[index].end_date.$errors"
              @touch="v$[index].end_date.$touch"
            />
          </div>

          <FormElementsTextarea
            v-model="item.description"
            placeholder="Your Job Description"
            name="description"
            :error="v$[index].description.$error"
            :valid="!v$[index].description.$invalid"
            :errorMessages="v$[index].description.$errors"
            @touch="v$[index].description.$touch"
          />

          <p class="text-xs text-gray-400">
            * Leave ending date empty if its your current job
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col mb-2" v-else>
    <Skeleton className="h-12 mb-4" />

    <div class="px-4 mb-4 flex flex-col gap-3">
      <Skeleton className="h-16" v-for="index in 3" :key="index" />
    </div>
  </div>
</template>