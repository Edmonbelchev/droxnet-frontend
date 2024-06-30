<script setup lang="ts">
import { required, maxValue, minValue, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const emits = defineEmits(["update:modelValue"]);

const start: Ref<number> = ref(0);
const end: Ref<number> = ref(100);

const rules = computed(() => {
  return {
    start: {
      required: helpers.withMessage("The start field is required", required),
      maxValue: helpers.withMessage("The start field must be less than the end field", maxValue(end.value - 1)),
    },
    end: {
      required: helpers.withMessage("The end field is required", required),
      minValue: helpers.withMessage("The end field must be greater than the start field", minValue(start.value)),
    },
  };
});

const v$ = useVuelidate(rules, {
  start,
  end,
});

watch([start, end], () => {
  const value = {
    start: start.value,
    end: end.value,
  };

  emits("update:modelValue", value);
});
</script>

<template>
  <div class="p-6 flex flex-col bg-white rounded-md">
    <h2 class="text-lg text-[--text-color] pb-3 mb-6 border-b">Hourly Rate</h2>

    <div class="flex flex-col gap-2 mb-4" v-if="v$.start.$error || v$.end.$error">
      <div class="bg-red-400 p-3 flex gap-2 items-start text-white rounded" v-if="v$.start.$error">
        <Icon name="zondicons:exclamation-solid" class="text-lg" />
        <p class="text-xs" v-for="(error, index) in v$.start.$errors" :key="index">
          {{ error.$message }}
        </p>
      </div>
    </div>

    <div class="flex gap-3">
      <FormElementsInput
        name="start"
        v-model="start"
        type="number"
        placeholder="Min"
        label="Min"
        icon="healthicons:dollar"
        iconClass="text-[--grat-color]"
        @touch="v$.start.$touch"
      />

      <FormElementsInput
        v-model="end"
        type="number"
        placeholder="Max"
        label="Max"
        icon="healthicons:dollar"
        iconClass="text-[--grat-color]"
        @touch="v$.end.$touch"
      />
    </div>
  </div>
</template>
