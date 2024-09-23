<script setup lang="ts">
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
  jobs: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:jobs"]);

const authStore = useAuthStore();
const user = authStore.user;

const toast: any = useNuxtApp().$toast;
const loading: Ref<boolean> = ref(false);
const loadingRepost: Ref<boolean> = ref(false);

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const deleteJob = async () => {
  loading.value = true;

  try {
    const response = await destroyJob(props.job.id);
    if (response.status.value === "success") {
      toast.success("Job deleted successfully");

      // Remove the deleted job from the jobs array
      const updatedJobs = props.jobs.filter((j: any) => j.id !== props.job.id);

      // Emit the updated jobs array to the parent component
      emit("update:jobs", updatedJobs);
    } else {
      toast.error("Failed to delete job");
    }
  } catch (error) {
    console.error("Error deleting job:", error);
    toast.error("An error occurred while deleting the job");
  }

  loading.value = false;
};

const repostJob = async () => {
  loadingRepost.value = true;

  try {
    const response = await updateJobStatus(props.job.id, "proposal");

    if (response.status.value === "success") {
      toast.success("Job reposted successfully");

      // Remove the deleted job from the jobs array
      const updatedJobs = props.jobs.filter((j: any) => j.id !== props.job.id);

      // Emit the updated jobs array to the parent component
      emit("update:jobs", updatedJobs);
    } else {
      toast.error("Failed to repost job");
    }
  } catch (error) {
    console.error("Error reposting job:", error);
    toast.error("An error occurred while reposting the job");
  }

  loadingRepost.value = false;
};
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
      v-if="user.role === 'employer'"
    >
      <button
        type="button"
        class="primary-button-sm flex items-center justify-center"
        @click="repostJob"
      >
        <Loader width="12" height="12" class="mr-2" v-if="loadingRepost" />
        Repost
      </button>
      <button
        type="button"
        class="font-bold uppercase p-3 text-gray-500/80"
        @click="openModal"
      >
        Delete
      </button>
    </div>

    <div
      class="flex gap-4 items-center justify-center py-4 md:py-0 w-full md:w-1/4"
      v-if="user.role === 'freelancer'"
    >
      <NuxtLink
        :to="`/profile/jobs/${job.id}`"
        class="primary-button-sm flex items-center justify-center"
        >View Job</NuxtLink
      >
    </div>
  </div>

  <Modal
    :is-open="isModalOpen"
    message="Are you sure you want to delete this job? This action cannot be undone."
    @close="closeModal"
    @submit="deleteJob"
    :loading="loading"
  />
</template>