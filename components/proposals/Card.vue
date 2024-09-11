<script setup>
defineProps({
  proposal: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex flex-col xl:flex-row bg-[--background-color] rounded-md xl:gap-4"
  >
    <div class="flex gap-4 p-4 w-full xl:w-2/6">
      <NuxtLink :to="`/users/${proposal.user.uuid}`">
        <img
          :src="proposal.user.profile_image"
          alt=""
          class="w-[60px] h-[60px] rounded-md"
          v-if="proposal.user.profile_image"
        />
        <div
          class="w-[60px] h-[60px] flex items-center justify-center bg-white rounded-md"
          v-else
        >
          <IconsAvatar :width="'50px'" :height="'50px'" :fill="'#e0e0e0'" />
        </div>
      </NuxtLink>

      <div class="flex flex-col">
        <NuxtLink
          :to="`/users/${proposal.user.uuid}`"
          class="text-[--text-color]"
        >
          {{ proposal.user.first_name }} {{ proposal.user.last_name }}
        </NuxtLink>

        <div class="flex items-center gap-1">
          <Icon name="ic:round-star" class="text-[#fecb02] text-xs" />

          <div class="flex">
            <span class="text-xs text-[--gray-color]">4.5/</span>
            <span class="text-xs text-[--gray-color]">5</span>
          </div>
          <span class="text-xs text-[--light-blue]"> (860 Feedback) </span>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col border-t xl:border-t-0 sm:flex-row xl:mt-12 xl:items-end xl:justify-end w-full xl:w-4/6"
    >
      <div class="p-4 flex sm:justify-end items-center xl:p-6 w-full sm:w-2/4">
        <NuxtLink
          :to="`/profile/proposals/${proposal.id}`"
          class="primary-button-sm h-fit sm:w-fit"
        >
          View Details
        </NuxtLink>
      </div>

      <div
        class="p-4 xl:p-6 flex flex-col gap-1 items-center w-full sm:w-1/4 border-t-[5px] sm:border-t-0 sm:border-l-[7px] border-white"
      >
        <span class="lg:text-lg text-[--text-color]"
          >${{ proposal.price }}</span
        >
        <span class="text-xs text-[--light-blue] text-center"
          >In {{ proposal.duration }}
          {{ getDurationType(proposal.duration_type, proposal.duration) }}</span
        >
      </div>

      <div
        class="p-4 xl:p-6 flex flex-col gap-1 items-center w-full sm:w-1/4 border-t-[5px] sm:border-t-0 sm:border-l-[7px] border-white"
      >
        <Icon name="mdi:envelope-outline" class="text-xl" />
        <span class="text-xs text-[--light-blue] text-center"
          >Cover Letter</span
        >
      </div>

      <div
        class="p-4 xl:p-6 flex flex-col gap-1 items-center w-full sm:w-1/4 border-t-[5px] sm:border-t-0 sm:border-l-[7px] border-white"
      >
        <Icon name="mingcute:attachment-line" class="text-xl" />
        <span class="text-xs text-[--light-blue] text-center"
          >{{ proposal.files.data.length }} Files Attached</span
        >
      </div>
    </div>
  </div>
</template>
