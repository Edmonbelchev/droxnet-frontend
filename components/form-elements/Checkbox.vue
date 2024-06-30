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
    default: "w-4 h-4 border flex justify-center items-center",
  },
  value: {
    type: [String, Number],
    required: true,
  },
  modelValue: {
    type: Array,
    required: true,
  }
});

const emit = defineEmits(["update:modelValue"]);

const isChecked = computed(() => props.modelValue.includes(props.value));

const toggleChecked = () => {
  const newValue = [...props.modelValue];
  if (isChecked.value) {
    const index = newValue.indexOf(props.value);
    if (index > -1) {
      newValue.splice(index, 1);
    }
  } else {
    newValue.push(props.value);
  }
  
  emit("update:modelValue", newValue);
};
</script>

<template>
  <label class="flex items-center gap-2 cursor-pointer" :for="id">
    <input
      type="checkbox"
      class="hidden"
      :checked="isChecked"
      @change="toggleChecked"
      :id="id"
      :value="value"
    />

    <slot name="checkElement">
      <div
        :class="[
          checkElementClass,
          { 'bg-[--green-color] border-[--green-color]': isChecked },
        ]"
      >
        <Icon
          name="heroicons-solid:check"
          v-if="isChecked"
          class="text-white text-sm"
        />
      </div>
    </slot>

    <slot name="content">
      <span class="text-[--text-color]">{{ label }}</span>
    </slot>
  </label>
</template>
