<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
    default: "Search...",
  },
  type: {
    type: String,
    default: "text",
  },
  inputClass: {
    type: String,
    default: "p-4 text-lg rounded-md",
  }
});

</script>

<template>
  <input
    :type="type"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    :class="inputClass"
  />
</template>

