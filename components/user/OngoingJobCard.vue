<script setup>
defineProps({
  job: {
    type: Object,
    required: true,
  },
});

const authStore = useAuthStore();
const user = authStore.user;
</script>

<template>
  <div class="flex flex-col md:flex-row bg-[--background-color] rounded">
    <div class="flex flex-col p-6 w-full md:w-3/4">
      <div class="mb-1 flex items-center gap-1">
        <Icon name="lets-icons:check-fill" class="text-[--green-color]" />
        <h3 class="text-[--text-color] text-sm">
          {{ job.user?.company_details?.company_name }}
        </h3>
      </div>

      <h4 class="text-[--text-color] text-lg mb-2">
        {{ job.title }}
      </h4>

      <div class="flex flex-wrap mb-8">
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
      <NuxtLink :to="`/profile/jobs/${job.id}`" class="w-fit ml-auto primary-button-sm">
        View Details
      </NuxtLink>
    </div>

    <div
      class="flex flex-col items-center justify-center py-4 md:py-0 w-full md:w-1/4 border-t-4 md:border-t-0 md:border-l-4 border-white"
    >
      <span class="font-bold text-xl text-[--green-color] mb-2 px-4">Hired</span>

      <span class="mb-2 px-4" v-if="user.role === 'employer'">
        {{ job.accepted_proposals[0].user.first_name }}
        {{ job.accepted_proposals[0].user.last_name }}
      </span>

      <div class="flex relative w-full justify-center p-2">
        <div
          class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"
        ></div>
        <div
          class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/80 to-transparent z-10"
        ></div>

        <div
          class="border-[3px] border-white bg-white rounded-full w-8 h-8 overflow-hidden"
          v-if="user.role === 'employer'"
        >
          <img
            :src="job.accepted_proposals[0].user.profile_image"
            :alt="job.accepted_proposals[0].user.first_name"
            class="rounded-full w-8 h-8 object-cover"
          />
        </div>

        <div
          class="border-[3px] border-white bg-white rounded-full w-8 h-8 overflow-hidden"
          v-else-if="user.role  === 'freelancer'"
        >
          <img
            :src="user.profile_image"
            :alt="user.first_name"
            class="rounded-full w-8 h-8 object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>