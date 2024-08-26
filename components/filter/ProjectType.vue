<script setup lang="ts">
defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="p-6 flex flex-col bg-white rounded-md">
    <h2 class="text-lg text-[--text-color] pb-3 mb-6 border-b">Project Type</h2>

    <div class="flex flex-col gap-3">
      <FormElementsRadio
        v-model="form.budget_type"
        name="budget_type"
        :options="budgetTypes"
        :label="budgetType.name"
        :value="budgetType.value"
        v-for="(budgetType, index) in budgetTypes()"
        :key="index"
      />
    </div>

    <FormElementsRangeSlider
      v-model="form.budget"
      :min="10"
      :max="500"
      :step="10"
    />
  </div>
</template>
