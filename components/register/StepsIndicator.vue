<script setup>
const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  step: {
    type: Number,
    required: true,
  },
  lineIndicator: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["changeStep"]);

const changeStep = () => {
  if(props.currentStep > props.step) {
    emit("changeStep", props.step);
  }
}
</script>

<template>
  <span
    class="bg-gray-400/20 w-[30px] h-[2px] transition-all relative"
    v-if="lineIndicator"
  >
    <span
      class="absolute h-full bg-[--primary-color] transition-all"
      :class="{
        'w-full': step == currentStep,
        'w-0': step != currentStep,
      }"
    ></span>
  </span>

  <button
    type="button"
    @click="changeStep"
    class="w-8 h-8 lg:w-10 lg:h-10 border-2 rounded-full flex justify-center items-center font-bold transition-all"
    :class="{
      'border-[--primary-color] text-[--primary-color]': step == currentStep,
    }"
  >
    {{ step }}
  </button>
</template>