<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  checkElementClass: {
    type: String,
    default: "w-4 h-4 border rounded-full flex justify-center items-center",
  },
  value: {
    type: [String, Number],
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isChecked = computed(() => props.modelValue === props.value);

const updateValue = () => {
  emit("update:modelValue", props.value);
};
</script>

<template>
  <label
    :class="[
      'flex items-center gap-2 cursor-pointer',
      { 'opacity-50': disabled },
    ]"
    :for="id"
  >
    <input
      type="radio"
      class="hidden"
      :checked="isChecked"
      @change="updateValue"
      :id="id"
      :value="value"
      :disabled="disabled"
    />
    <slot name="checkElement">
      <div
        class="border-2 w-4 h-4 rounded-full flex justify-center items-center"
      >
        <span class="w-[6px] h-[6px] rounded-full border-0 bg-[--green-color]" :class="checkElementClass" v-if="isChecked"></span>
      </div>
    </slot>
    <slot name="content">
      <span class="text-[--text-color]">{{ label }}</span>
    </slot>
  </label>
</template>