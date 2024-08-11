<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "toggle",
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <span v-if="label" class="ml-3 text-gray-500">
        {{ label }}
    </span>

    <label :for="id" class="relative inline-block w-12 h-6 cursor-pointer">
      <input
        :id="id"
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="sr-only peer"
      />
      <span
        class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-[--primary-color]"
      ></span>
      <span
        class="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full bg-white transition-transform peer-checked:translate-x-6"
      ></span>
    </label>
  </div>
</template>