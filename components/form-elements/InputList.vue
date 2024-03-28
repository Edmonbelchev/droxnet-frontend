<script setup lang="ts">
defineProps({
  placeholder: {
    type: String
  },
  mainClass: {
    type: String,
    default: "flex",
  },
  inputClass: {
    type: String,
    default: "p-4 text-lg rounded-md",
  },
  selectClass: {
    type: String,
    default: "p-4 text-lg rounded-md",
  },
  selectPlaceholder: {
    type: String
  },
  selectOptions: {
    type: Array,
    required: true,
  },
  selectType: {
    type: String,
    default: "single",
  },
});

const search: Ref<String> = ref("");
const selected: Ref<String> = ref("");

const emit = defineEmits(["update:modelValue", "selectModelValue"]);

watch(
  () => search.value,
  (value: any) => {
    emit("update:modelValue", value);
  }
);

watch(
  () => selected.value,
  (value: any) => {
    emit("selectModelValue", value);
  }
);
</script>

<template>
  <div :class="mainClass">
    <FormElementsInput
      :inputClass="inputClass"
      :placeholder="placeholder"
      v-model="search"
    />

    <FormElementsSelect
      :selectClass="selectClass"
      :selectOptions="selectOptions"
      :placeholder="selectPlaceholder"
      v-model="selected"
    />

    <button class="py-4 px-6 bg-[--primary-color] text-white rounded-r">
      <font-awesome icon="magnifying-glass" />
    </button>
  </div>
</template>

