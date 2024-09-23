
<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
  },
  selectClass: {
    type: String,
    default: "p-4 text-lg rounded-md min-w-[255px] w-3/4",
  },
  selectOptions: {
    type: Array,
    required: true,
    default: () => [],
  },
  optionClass: {
    type: String,
    default:
      "p-4 lg:text-lg rounded-md bg-white cursor-pointer hover:bg-gray-100/50 transition-all duration-300",
  },
  wrapperClass: {
    type: String,
    default:
      "absolute w-full flex flex-col bg-white rounded-b-md top-10 lg:top-14 max-h-0 overflow-hidden transition-all duration-300 shadow-lg",
  },
  buttonClass: {
    type: String,
    default: "flex justify-center items-center w-2/4 min-w-[50px] bg-[--primary-color] text-white rounded-r text-base hover:bg-[--primary-color-dark] duration-300"
  },
  trailing: {
    type: String,
    default: "",
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

const showDropdown: Ref<Boolean> = ref(false);

// Generate random ID in order to have unique radio input IDs
const randomID = generateRandomID(4);

const emit = defineEmits(["update:modelValue", "submit"]); // Added submit event

const selectedLabel = computed(() => {
  if (!Array.isArray(props.selectOptions) || props.selectOptions.length === 0) {
    return "";
  }
  const selectedOption = props.selectOptions.find(
    (option) => option.value === props.modelValue
  );
  return selectedOption ? selectedOption.label : props.selectOptions[0].label;
});

function handleSubmit() {
  emit("submit"); // Emit submit event
}

function updateValue(value: string) {
  emit("update:modelValue", value);
}
</script>

<template>
  <div class="relative" v-click-outside="() => (showDropdown = false)">
    <div class="flex">
      <div
        class="bg-white cursor-pointer flex gap-2 items-center justify-between w-full"
        :class="[
          errorMessages.length > 0 ? 'border-red-500' : 'border',
          selectClass,
        ]"
        @click="showDropdown = !showDropdown"
      >
        <span v-if="placeholder && modelValue.length == 0">{{
          placeholder
        }}</span>

        <div
          v-else-if="!placeholder && !modelValue && selectOptions.length > 0"
        >
          <span class="text-gray-400" v-if="trailing">
            {{ trailing }}
          </span>

          {{ selectOptions[0].label }}
        </div>

        <div v-else>
          <span class="text-gray-400" v-if="trailing">
            {{ trailing }}
          </span>
          {{ selectedLabel }}
        </div>

        <font-awesome icon="chevron-down" />
      </div>

      <button
        @click="handleSubmit"
        :class="buttonClass"
      >
        <Icon name="fe:check" class="" />
      </button>
    </div>

    <div :class="[wrapperClass, { 'max-h-[200px]': showDropdown }]">
      <label
        :for="`${randomID}_${option.value}`"
        v-for="(option, index) in selectOptions"
        :key="index"
        :class="[optionClass, { 'bg-gray-100/50': modelValue == option.value }]"
        @click="showDropdown = false"
      >
        <span>
          {{ option.label }}
        </span>

        <input
          type="radio"
          :name="`${randomID}_option`"
          :id="`${randomID}_${option.value}`"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="updateValue(option.value)"
          class="hidden"
        />
      </label>
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

