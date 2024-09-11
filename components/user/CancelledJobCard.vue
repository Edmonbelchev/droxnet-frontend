<script setup>
defineProps({
  job: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col md:flex-row bg-red-100/80 rounded px-8 py-8">
    <div class="flex flex-col w-full md:w-3/4">
      <div class="mb-1 flex items-center gap-1">
        <Icon name="lets-icons:check-fill" class="text-[--green-color]" />
        <h3 class="text-[--text-color] text-sm">
          {{ job.user.company_details.company_name }}
        </h3>
      </div>

      <h4 class="text-[--text-color] text-lg mb-2">
        {{ job.title }}
      </h4>

      <div class="flex flex-wrap">
        <span
          class="text-[13px] text-[--text-color] border-gray-300 pr-3 flex items-center gap-1"
          v-if="job.budget_type"
        >
          <Icon name="lucide:dollar-sign" class="text-[--green-color]" />

          {{ job.budget_type }}
        </span>

        <span
          class="text-[13px] text-[--text-color] border-l border-gray-300 pr-3 pl-3 flex items-center gap-1"
          v-if="job.country"
        >
          <img
            :src="countryFlag(job.country)"
            :alt="job.country"
            class="w-[18px]"
          />

          {{ countryName(job.country) }}
        </span>

        <span
          class="text-[13px] text-[--text-color] border-l border-gray-300 pr-3 pl-3 flex items-center gap-1"
          v-if="job.type"
        >
          <Icon name="material-symbols:folder-outline" class="text-blue-500" />

          Type: {{ job.type }}
        </span>

        <span
          class="text-[13px] text-[--text-color] border-l border-gray-300 pl-3 flex items-center gap-1"
          v-if="job.duration"
        >
          <Icon name="ph:clock" class="text-[--primary-color]" />

          Duration: {{ job.duration }}
        </span>
      </div>
    </div>

    <div
      class="flex gap-4 items-center justify-center py-4 md:py-0 w-full md:w-1/4"
    >
      <button type="button" class="primary-button-sm">Repost</button>
      <button type="button" class="font-bold uppercase p-3 text-gray-500/80">
        Delete
      </button>
    </div>
  </div>
</template>