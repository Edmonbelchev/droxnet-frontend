<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    validator: (value) => "start" in value && "end" in value,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:modelValue"]);

const localStart = ref(props.modelValue.start);
const localEnd = ref(props.modelValue.end);

watch(
  () => props.modelValue,
  (newValue) => {
    localStart.value = newValue.start;
    localEnd.value = newValue.end;
  },
  { deep: true }
);

const updateStart = () => {
  if (Number(localStart.value) > Number(localEnd.value)) {
    localStart.value = localEnd.value;
  }
  emitUpdate();
};

const updateEnd = () => {
  if (Number(localEnd.value) < Number(localStart.value)) {
    localEnd.value = localStart.value;
  }
  emitUpdate();
};

const emitUpdate = () => {
  emit("update:modelValue", {
    start: Number(localStart.value),
    end: Number(localEnd.value),
  });
};

const progressStyle = computed(() => {
  const startPercentage =
    ((localStart.value - props.min) / (props.max - props.min)) * 100;
  const endPercentage =
    ((localEnd.value - props.min) / (props.max - props.min)) * 100;
  return {
    left: `${startPercentage}%`,
    width: `${endPercentage - startPercentage}%`,
  };
});
</script>

<template>
  <div class="range-slider">
    <div class="slider-container">
      <div class="slider-track"></div>
      <div class="slider-progress" :style="progressStyle"></div>
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="localStart"
        @input="updateStart"
        class="slider slider-start"
      />
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model="localEnd"
        @input="updateEnd"
        class="slider slider-end"
      />
    </div>
    <div class="value-display">
      <span>${{ localStart }}</span> - <span>${{ localEnd }}</span>
    </div>
  </div>
</template>

<style scoped>
.range-slider {
  width: 100%;
  padding: 20px 0 0;
}

.slider-container {
  position: relative;
  height: 2px;
  margin: 20px 0;
}

.slider-track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #cfcfcf;
}

.slider-progress {
  position: absolute;
  top: 0;
  height: 2px;
  background: #ff5851;
}

.slider {
  -webkit-appearance: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: none;
  outline: none;
  margin: 0;
  pointer-events: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  top: 0px;
  width: 20px;
  height: 20px;
  margin: -9px 0 0;
  border: 2px solid #ff5851;
  background: #fff;
  border-radius: 50px;
  -webkit-box-shadow: 0 0 0 5px rgba(255, 88, 81, 0.2);
  box-shadow: 0 0 0 5px rgba(255, 88, 81, 0.2);
  cursor: pointer;
  pointer-events: auto;
}

.slider::-moz-range-thumb {
  top: 0px;
  width: 20px;
  height: 20px;
  margin: -9px 0 0;
  border: 2px solid #ff5851;
  background: #fff;
  border-radius: 50px;
  -moz-box-shadow: 0 0 0 5px rgba(255, 88, 81, 0.2);
  box-shadow: 0 0 0 5px rgba(255, 88, 81, 0.2);
  cursor: pointer;
  pointer-events: auto;
}

.value-display {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  font-weight: bold;
  color: #ff5851;
}
</style>