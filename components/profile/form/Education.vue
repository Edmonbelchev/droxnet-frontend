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
const educationStore = useEducationStore();

const retrieveUserEducations = async () => {
  const response: any = await fetchUserEducations(props.user.uuid);

  if (response.status.value === "success") {
    const result = response.data.value.data.map((experience: any) => {
      return {
        id: experience.id,
        school_name: experience.school_name,
        degree: experience.degree,
        field_of_study: experience.field_of_study,
        start_date: experience.start_date,
        end_date: experience.end_date,
        description: experience.description,
        opened: false,
      };
    });

    // Update the education store
    educationStore.storeValues(result);

    emit("update", result);

    setTimeout(() => {
      emit("loaded", true);
    }, 100);
  }
};

const addEducation = () => {
  // Push new object inside the array
  props.form.push({
    id: null,
    school_name: "",
    degree: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
    description: "",
    opened: false,
  });

  // Update the education store
  educationStore.storeValues(props.form);
};

const removeEducation = (index: Number) => {
  props.form.splice(index, 1);

  // Update the education store
  educationStore.storeValues(props.form);
};

onMounted(async () => {
  // if education store have values, load the data from it
  if (educationStore.educations.length > 0) {
    emit("update", educationStore.educations);
    emit("loaded", true);
  } else {
    await retrieveUserEducations();
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

        <h4 v-else>Add Your Education</h4>
      </div>

      <button
        type="button"
        class="text-blue-400 text-sm font-medium"
        @click="addEducation()"
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
          v-if="item.school_name"
        >
          {{ item.school_name }}

          <span class="text-xs text-[--gray-color]" v-if="item.start_date">
            ({{ item.start_date }}
            <span v-if="item.end_date"> - {{ item.end_date }}) </span>
            <span v-else> Present) </span>
          </span>
        </div>

        <div v-else>
          <p class="text-[--gray-color]">No education added yet</p>
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
            @click="removeEducation(index)"
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
            v-model="item.school_name"
            type="text"
            placeholder="Your School Name"
            name="school_name"
            :error="v$[index].school_name.$error"
            :valid="!v$[index].school_name.$invalid"
            :errorMessages="v$[index].school_name.$errors"
            @touch="v$[index].school_name.$touch"
          />

          <div class="flex flex-col sm:flex-row gap-2">
            <FormElementsInput
              v-model="item.degree"
              type="text"
              placeholder="Your Degree"
              name="degree"
              :error="v$[index].degree.$error"
              :valid="!v$[index].degree.$invalid"
              :errorMessages="v$[index].degree.$errors"
              @touch="v$[index].degree.$touch"
            />

            <FormElementsInput
              v-model="item.field_of_study"
              type="text"
              placeholder="Your Field of Study"
              name="field_of_study"
              :error="v$[index].field_of_study.$error"
              :valid="!v$[index].field_of_study.$invalid"
              :errorMessages="v$[index].field_of_study.$errors"
              @touch="v$[index].field_of_study.$touch"
            />
          </div>

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
            placeholder="Your Description"
            name="description"
            :error="v$[index].description.$error"
            :valid="!v$[index].description.$invalid"
            :errorMessages="v$[index].description.$errors"
            @touch="v$[index].description.$touch"
          />

          <p class="text-xs text-gray-400">
            * Leave ending date empty if you are still studying
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