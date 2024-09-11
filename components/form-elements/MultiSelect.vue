<script setup lang="ts">
import { ref, watch, computed } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
  },
  options: {
    type: Array,
    required: true,
  },
  asyncSearch: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default:
      "bg-white cursor-pointer flex gap-2 items-center justify-between w-full border rounded-md p-3 min-h-[46px] sm:min-h-[50px]",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "update:modelValue",
  "updateSearchValue",
  "searchMethod",
]);

const selected = ref(props.modelValue);
const showDropdown = ref(false);
const search = ref("");

const computedOptions = computed(() => {
  return props.options.filter((element: any) =>
    element.label.toLowerCase().includes(search.value.toLowerCase())
  );
});

watch(search, (value: string) => {
  if (props.asyncSearch) {
    emit("searchMethod", value);
  }
});

watch(
  () => selected.value,
  (value: any[]) => {
    emit("update:modelValue", value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (value: any[]) => {
    selected.value = value;
  },
  { immediate:true, deep: true }
);

const toggleSelection = (option: any) => {
  const index = selected.value.findIndex((item) => item.value === option.value);
  if (index === -1) {
    selected.value.push(option);
  } else {
    selected.value.splice(index, 1);
  }
};

const isSelected = (option: any) => {
  return selected.value.some((item) => item.value === option.value);
};

const removeSelected = (option: any) => {
  const index = selected.value.findIndex((item) => item.value === option.value);
  if (index !== -1) {
    selected.value.splice(index, 1);
  }
};
</script>

<template>
  <div
    class="relative w-full"
    @click="showDropdown = true"
    v-click-outside="() => (showDropdown = false)"
  >
    <div :class="[{ 'border-red-500': errorMessages.length > 0 }, className]">
      <span class="flex gap-2 items-center" v-if="loading">
        <Loader /> Loading...
      </span>
      <div v-else class="flex gap-2 truncate overflow-hidden w-full">
        <span v-if="placeholder && selected.length === 0">{{
          placeholder
        }}</span>
        <template v-else>
          <span
            v-for="item in selected"
            :key="item.value"
            class="bg-gray-200 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {{ item.label }}
            <button
              @click.stop="removeSelected(item)"
              class="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </span>
        </template>
      </div>
      <font-awesome icon="chevron-down" />
    </div>
    <div
      class="flex flex-col absolute w-full bg-white border-x rounded-t-sm shadow-lg z-10 overflow-hidden"
      :class="showDropdown ? 'max-h-[300px]' : 'max-h-[0]'"
    >
      <input
        type="text"
        name="search"
        placeholder="Search skills by name"
        class="p-3 border-b"
        autocomplete="off"
        v-model="search"
      />
      <div class="flex flex-col overflow-y-scroll" v-if="options.length > 0">
        <label
          :for="option.value"
          v-for="(option, index) in computedOptions"
          :key="index"
          class="p-3 text-sm border-b cursor-pointer hover:bg-gray-200/50 transition-all duration-300"
          :class="{ 'bg-gray-300': isSelected(option) }"
          @click="toggleSelection(option)"
        >
          <span> {{ option.label }} </span>
          <input
            type="checkbox"
            :name="option.label"
            :id="option.label"
            :value="option.value"
            :checked="isSelected(option)"
            class="hidden"
          />
        </label>
      </div>
      <div v-else>
        <div class="p-3 text-sm">No results found</div>
      </div>
    </div>
    <span
      class="text-red-500 text-xs"
      v-for="(error, index) in errorMessages"
      :key="index"
    >
      {{ error.$message }}
    </span>
  </div>
</template>