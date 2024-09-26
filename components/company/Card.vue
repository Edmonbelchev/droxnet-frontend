<script setup lang="ts">
defineProps({
  company: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-wrap gap-2 bg-[--background-color] justify-between rounded-lg p-4">
    <div class="flex flex-wrap items-center gap-2">
      <NuxtLink
        :to="`/companies/${company.id}`">
        <img
          :src="company.profile_image"
        :alt="company.company_details.company_name"
        class="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded"
      />
      </NuxtLink>

      <div class="flex flex-col gap-1">
        <div
          class="text-xs text-[--text-color] flex items-center gap-1"
          v-if="company.email_verified"
        >
          <Icon
            name="material-symbols:verified"
            class="text-[--green-color] text-sm"
          />
          Verified Company
        </div>

        <NuxtLink
          :to="`/companies/${company.uuid}`"
          class="text-sm sm:text-base text-[--text-color] hover:text-[--primary-color] hover:underline"
        >
          {{ company.company_details.company_name }}
        </NuxtLink>
      </div>
    </div>
    <div class="flex flex-wrap gap-3 my-auto">
      <NuxtLink
        :to="`/companies/${company.uuid}`"
        class="text-[--light-blue] text-xs border-r pr-3"
      >
        Open Jobs
      </NuxtLink>
      <NuxtLink
        :to="`/companies/${company.uuid}`"
        class="text-[--light-blue] text-xs border-r pr-3"
      >
        Full Profile
      </NuxtLink>
      <span class="text-[--primary-color] text-xs">Following</span>
    </div>
  </div>
</template>
