<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
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
    type: String,
  },
  selectOptions: {
    type: Array,
    required: true,
  },
  selectType: {
    type: String,
    default: "single",
  },
  buttonClass:{
    type: String,
    default: "py-4 px-6 bg-[--primary-color] text-white rounded-r"
  }
});

const search: Ref<String> = ref("");
const selected: Ref<String> = ref("");
const result: Ref<Object> = ref({});

const emit = defineEmits(["update:modelValue"]);

watch(
  () => search.value,
  (value: any) => {
    result.value.search = value;
  }
);

watch(() => selected.value, (value: any) => {
    result.value.selected = value;
});

watch(() => result.value, (value: any) => {
    emit("update:modelValue", value);
}, { deep: true });
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

    <button :class="buttonClass">
      <font-awesome icon="magnifying-glass" />
    </button>
  </div>
</template>

