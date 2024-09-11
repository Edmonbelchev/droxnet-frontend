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
      <FormElementsCheckbox
        v-model="form.duration"
        name="duration"
        :options="durationOptions"
        :label="durationOption.label"
        :value="durationOption.value"
        v-for="(durationOption, index) in retrieveDurationOptions()"
        :key="index"
      />
    </div>
  </div>
</template>
