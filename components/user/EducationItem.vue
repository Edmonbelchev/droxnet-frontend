<script setup>
defineProps({
  education: {
    type: Object,
    required: true,
  },
  className: {
    type: String,
    default: "p-6 bg-white",
  },
});
</script>

<template>
  <div :class="className">
    <div class="mb-5">
      <h3 class="text-black text-base">{{ education.field_of_study }}</h3>
    </div>

    <div class="flex gap-4 mb-5">
      <div class="flex items-center gap-2 text-sm">
        <Icon name="ph:building-bold" />
        {{ education.school_name }}
      </div>

      <div class="flex items-center gap-2">
        <Icon name="uiw:date" />

        <span class="text-sm">
          {{ education.start_date }}
          <span v-if="education.end_date">- {{ education.end_date }}</span>
          <span v-else>- Till now</span>
        </span>
      </div>
    </div>

    <p>
      {{ education.description }}
    </p>
  </div>
</template>