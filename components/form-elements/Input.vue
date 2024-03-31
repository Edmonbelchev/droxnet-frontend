<script setup lang="ts">
defineProps({
  label: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  inputClass: {
    type: String,
    default: "px-4 py-2 min-h-[50px] rounded border focus:border-[--primary-color] transition-all duration-300 w-full",
  },
  error: {
    type: Boolean,
    default: false,
  },
  valid: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <div class="flex flex-col gap-2 flex-1">
    <div class="relative">
      <label :for="name" v-if="label">{{ label }}</label>
  
      <input
        :name="name"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @change="$emit('touch')"
        :placeholder="placeholder"
        class="w-full"
        :class="[inputClass, { 'border-red-500': error }, { 'border-green-500': valid }]"
      />
  
      <Icon
        v-if="error || valid"
        class="absolute right-4 h-full text-xl text-green-500"
        :class="{ 'text-red-500': error, 'text-green-500': valid}"
        :name="`heroicons-solid:${error ? 'exclamation' : 'check-circle'}`"
      />
    </div>
  
    <span class="text-red-500 text-xs"  v-for="(error, index) in errorMessages" :key="index">
      {{ error.$message }}
    </span>
  </div>
</template>

