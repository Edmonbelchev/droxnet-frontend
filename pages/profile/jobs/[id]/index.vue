<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const toast: any = useNuxtApp().$toast;

const job: Ref<Object> = ref({});
const jobProposal: Ref<Object> = ref({});
const loading: Ref<boolean> = ref(true);
const loadingUpdateStatus: Ref<boolean> = ref(false);

const isModalOpen = ref(false);
const selectedStatus = ref("");

const retrieveJob = async () => {
  try {
    const response = await fetchJob(route.params.id);

    if (response.status.value === "success") {
      job.value = response.data.value.data;
      jobProposal.value = job.value.accepted_proposals[0];
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    toast.error("Failed to retrieve job.");
  }

  loading.value = false;
};

// Function to open the modal with the selected status
const confirmUpdateStatus = (status: string) => {
  selectedStatus.value = status;
  isModalOpen.value = true;
};

const handleUpdateStatus = async () => {
  loadingUpdateStatus.value = true;

  const response = await updateJobStatus(job.value.id, selectedStatus.value);
  if (response.status.value === "success") {
    toast.success("Job status updated successfully");

    // TODO: Handle redirect on complete
  } else {
    toast.error(response?.error ?? "Failed to update job status");
  }
  isModalOpen.value = false; // Close the modal after submission
  loadingUpdateStatus.value = false;
};

onMounted(retrieveJob);
</script>

<template>
  <NuxtLayout name="default">
    <ProfileSidebarMenu :user="authStore.user" />

    <div class="relative py-8 px-4 md:py-10 md:px-16">
      <div v-if="loading">Loading...</div>

      <div
        class="flex flex-col order-2 md:order-1 w-full md:w-[1014px] shadow-lg bg-white rounded-md mx-auto"
        v-else
      >
        <div class="flex flex-col rounded-md w-full">
          <h2
            class="border-b p-4 md:p-6 text-[--text-color] text-base md:text-lg"
          >
            Job Details
          </h2>
        </div>

        <div class="flex flex-col p-4 md:p-6 gap-2">
          <h4
            class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-2 border-l-4 border-[--primary-color] text-base"
          >
            Hired Freelancer
          </h4>

          <div class="px-6 mb-4">
            <ProfileHiredFreelancerCard :user="jobProposal.user" />
          </div>

          <h4
            class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-2 border-l-4 border-[--primary-color] text-base"
          >
            Proposal
          </h4>

          <div class="px-6">
            <ProposalsCardUpdateStatus
              :proposal="jobProposal"
              :status="job?.status"
              @submit="confirmUpdateStatus($event)"
            />

            <Modal
              :is-open="isModalOpen"
              message="Are you sure you want to update the job status?"
              @close="isModalOpen = false"
              @submit="handleUpdateStatus"
              :loading="loadingUpdateStatus"
            />
          </div>
        </div>

        <div class="flex flex-col p-4 md:p-6 gap-2">
          <h4
            class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-2 border-l-4 border-[--primary-color] text-base"
          >
            Project History
          </h4>

          <div class="px-6 mb-4">
            <JobsHistory :jobID="job.id" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
