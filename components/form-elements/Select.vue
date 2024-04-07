
<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
  },
  selectClass: {
    type: String,
    default: "p-4 text-lg rounded-md min-w-[255px]",
  },
  selectOptions: {
    type: Object,
    required: true,
  }
});

const selected: Ref<String>      = ref("");
const showDropdown: Ref<Boolean> = ref(false);

// Generate random ID in order to have unique radio input IDs
const randomID = generateRandomID(4)

const emit = defineEmits(["update:modelValue"]);

watch(
  () => selected.value,
  (value: any) => {
    emit("update:modelValue", value);
  }
);
</script>

<template>
  <div class="relative">
    <div
      class="bg-white cursor-pointer flex gap-2 items-center justify-between w-full"
      :class="selectClass"
      @click="showDropdown = !showDropdown"
    >
      <span v-if="placeholder && selected.length == 0">{{ placeholder }}</span>

      <span v-else-if="!placeholder && selected.length == 0">
        In: {{ selectOptions[0].label }}
      </span>

      <span v-else>
        In: {{ selectOptions.find((option) => option.value == selected).label }}
      </span>

      <font-awesome icon="chevron-down" />
    </div>

    <div 
        class="absolute w-full flex flex-col bg-white rounded-b-md top-10 lg:top-14 max-h-0 overflow-hidden transition-all duration-300 shadow-lg"
        :class="{ 'max-h-[200px]': showDropdown }"
    >
      <label
        :for="`${randomID}_${option.value}`"
        v-for="(option, index) in selectOptions"
        :key="index"
        class="p-4 lg:text-lg rounded-md bg-white cursor-pointer hover:bg-gray-100/50 transition-all duration-300"
        :class=" {'bg-gray-100/50' : selected.value == option.value } "
      >
        <span>
          {{ option.label }}
        </span>

        <input
          type="radio"
          :name="`${randomID}_option`"
          :id="`${randomID}_${option.value}`"
          :value="option.value"
          v-model="selected"
          class="hidden"
        />
      </label>
    </div>
  </div>
</template>

