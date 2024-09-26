<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col md:flex-row bg-[--background-color] rounded">
    <div class="flex flex-col p-6 w-full">
      <div class="mb-1 flex items-center gap-1">
        <Icon name="lets-icons:check-fill" class="text-[--green-color]" />

        <NuxtLink :to="`/companies/${job.user.uuid}`">
            <h3 class="text-[--text-color] text-sm">
              {{ job.user.company_details.company_name }}
            </h3>
        </NuxtLink>
      </div>

      <NuxtLink :to="`/jobs/${job.id}`">
        <h4 class="text-[--text-color] text-lg mb-2">
          {{ job.title }}
        </h4>
      </NuxtLink>

      <div class="flex">
        <div class="flex items-center gap-1 pr-2 mr-2 border-r border-gray-300">
          <Icon name="lucide:dollar-sign" class="text-[--green-color]" />

          <span class="text-xs text-[--text-color]">
            {{ job.budget_type }}
          </span>
        </div>

        <div class="flex items-center gap-1 pr-2 mr-2 border-r border-gray-300">
          <img
            :src="countryFlag(job.country)"
            :alt="job.country"
            class="w-[18px]"
          />

          <span class="text-xs text-[--text-color]">
            {{ countryName(job.country) }}
          </span>
        </div>

        <div class="flex items-center gap-1 pr-2 mr-2 border-r border-gray-300">
          <Icon name="material-symbols:folder-outline" class="text-blue-500 text-base" />

          <span class="text-xs text-[--text-color]">
            {{ job.type }}
          </span>
        </div>

        <div class="flex items-center gap-1 pr-2 mr-2 border-r border-gray-300">
          <Icon name="ph:clock" class="text-[--primary-color] text-lg" />

          <span class="text-xs text-[--text-color]">
            {{ job.duration }}
          </span>
        </div>

        <div class="flex items-center gap-1">
          <Icon name="ph:heart-fill" class="text-[--primary-color] text-lg" />
          <span class="text-xs">
              Saved
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
