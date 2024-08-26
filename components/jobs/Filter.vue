<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(["submit"]);

const disabledButton = computed(() => {
  if (
    props.form.budget.start === "" ||
    props.form.budget.end === "" ||
    props.form.budget.start >= props.form.budget.end ||
    props.form.budget.end <= props.form.budget.start
  ) {
    return true;
  }
});

const submit = () => {
  emits("submit");
};
</script>

<template>
  <div class="rounded-md flex flex-col gap-6">

    <FilterCategories :form="form" />

    <FilterProjectType :form="form" />

    <FilterLocations :form="form" />

    <FilterProjectLength :form="form" />

    <div class="bg-white px-10 p-6 flex flex-col gap-4 rounded-md text-center">
      <p class="text-xs leading-5 text-[--gray-color]">
        Click “Apply Filter” to apply latest changes made by you.
      </p>
      <button
        @click="submit"
        type="button"
        class="primary-button w-fit mx-auto flex gap-2 items-center"
        :class="{
          'cursor-not-allowed opacity-50': disabledButton || loading,
        }"
        :disabled="disabledButton || loading"
      >
        Apply Filters

        <Loader width="14" v-if="loading" />
      </button>
    </div>
  </div>
</template>