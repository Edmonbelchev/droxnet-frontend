<script setup>
defineProps({
  job: {
    type: Object,
    required: true,
  },
  showButtons: {
    type: Boolean,
    default: true,
  },
});

const user = useAuthStore().user;
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

      <div class="ml-auto flex gap-2" v-if="showButtons">
        <NuxtLink
          :to="`/profile/post-job/${job.id}`"
          class="w-fit primary-button-sm"
          v-if="user.role === 'employer'"
        >
          Edit
        </NuxtLink>

        <NuxtLink :to="`/jobs/${job.id}`" class="w-fit primary-button-sm">
          View Details
        </NuxtLink>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center w-full md:w-1/4 border-t-4 md:border-t-0 md:border-l-4 border-white"
    >
      <NuxtLink
        :to="`/profile/proposals?job_id=${job.id}`"
        class="md:mx-4 px-4 py-2 flex flex-col"
        v-if="job.proposals_count > 0"
      >
        <span class="font-bold text-lg text-[--green-color] text-center">
          {{ job.proposals_count }}
        </span>

        <span>Proposals</span>
      </NuxtLink>
      <div class="md:mx-4 px-4 py-2 flex flex-col" v-else>
        <span class="font-bold text-lg text-[--green-color] text-center">
          {{ job.proposals_count }}
        </span>

        <span>Proposals</span>
      </div>

      <div
        class="flex relative w-full justify-center p-2"
        v-if="job.proposals_count > 0 || user.role === 'freelancer'"
      >
        <div
          class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"
        ></div>
        <div
          class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/80 to-transparent z-10"
        ></div>

        <div
          class="border-[3px] border-white bg-white rounded-full w-8 h-8 overflow-hidden"
          v-if="user.role === 'freelancer'"
        >
          <img
            :src="user.profile_image"
            :alt="user.name"
            class="rounded-full w-8 h-8 object-cover"
          />
        </div>

        <div
          class="border-[3px] border-white bg-white rounded-full w-8 h-8 overflow-hidden"
          v-else
          v-for="(proposal, index) in job.proposals"
          :key="index"
          :class="{ '-ml-2': index !== 0 }"
        >
          <img
            :src="proposal.user.profile_image"
            :alt="proposal.user.name"
            class="rounded-full w-8 h-8 object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>