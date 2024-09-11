<script setup lang="ts">
const route = useRoute();
const authStore = useAuthStore();

const loading: Ref<boolean> = ref(false);

const proposals: Ref<Array<Object>> = ref([]);
const perPage: Ref<number> = ref(8);
const page: Ref<number | any> = ref(route.query.page ?? 1);
const total: Ref<number> = ref(0);
const jobID: Ref<number | any> = ref(route.query.job_id ?? null);
const loadingProposals: Ref<boolean> = ref(true);

const job: Ref<Object | null> = ref(null);
const jobIsLoaded: Ref<boolean> = ref(false);

const retrieveProposals = async () => {
  loading.value = true;

  const response = await fetchProposals(
    perPage.value,
    page.value,
    null,
    jobID.value
  );

  if (response.status.value === "success") {
    proposals.value = response.data.value.data;
    total.value = response.data.value.meta.total;
  }

  loading.value = false;
  loadingProposals.value = false;
};

const retrieveJob = async () => {
  const response = await fetchJob(jobID.value);
  if (response.status.value === "success") {
    job.value = response.data.value.data;
  }

  jobIsLoaded.value = true;
};

/* Watch for page and perPage changes */
watch([page, perPage], async () => {
  await retrieveProposals();
});

onMounted(async () => {
  if (jobID.value) {
    retrieveJob();
  }

  await retrieveProposals();
});
</script>

<template>
  <div
    class="bg-[--background-color] py-8 px-4 md:py-10 md:px-16 flex flex-col lg:flex-row justify-center gap-8"
  >
    <div
      class="flex flex-col order-2 lg:order-1 w-full lg:w-[1014px] shadow-lg bg-white rounded-md"
    >
      <div class="flex flex-col rounded-md w-full">
        <h2
          class="border-b p-4 md:p-6 text-[--text-color] text-base md:text-lg"
        >
          Manage Jobs
        </h2>
      </div>

      <div class="flex flex-col p-4 md:p-6">
        <div class="mb-8" v-if="jobID">
          <UserJobCard :job="job" v-if="jobIsLoaded" :showButtons="false" />

          <div
            class="w-full h-34 bg-gray-200 p-6 rounded mb-2 animate-pulse flex gap-4"
            v-else
          >
            <div class="flex flex-col w-3/4 gap-4">
              <Skeleton class="h-4 rounded" />
              <Skeleton class="h-8 rounded mb-8" />

              <Skeleton class="h-8 w-28 rounded ml-auto" />
            </div>

            <div class="flex flex-col w-1/4 gap-4">
              <Skeleton class="h-4 rounded" />
              <Skeleton class="h-4 rounded" />
              <Skeleton class="h-8 rounded mt-auto" />
            </div>
          </div>
        </div>

        <div class="flex flex-col" v-if="loadingProposals">
          <h4
            class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
          >
            Received Proposals
          </h4>

          <div
            class="md:h-[160px] bg-gray-200 mb-4 rounded-md flex flex-col md:flex-row p-6 gap-4"
            v-for="n in 8"
            :key="n"
          >
            <div class="flex gap-2 mb-4 md:w-1/2">
              <Skeleton class="h-[60px] w-[60px] rounded" />
              <Skeleton class="h-[30px] w-[40px] rounded" />
            </div>

            <div
              class="flex flex-col md:flex-row gap-4 md:w-1/2 justify-end items-end"
            >
              <Skeleton class="h-[50px] w-1/4 rounded" />
              <Skeleton class="h-[50px] w-1/4 rounded" />
              <Skeleton class="h-[50px] w-1/4 rounded" />
              <Skeleton class="h-[50px] w-1/4 rounded" />
            </div>
          </div>
        </div>

        <div class="flex flex-col" v-else>
          <h4
            class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
          >
            Received Proposals
          </h4>

          <div class="flex flex-col gap-4 px-4 mb-4 relative">
            <div
              class="flex flex-col gap-2 absolute inset-0 w-full h-full justify-center items-center z-10 cursor-wait"
              v-if="loading"
            >
              <span
                class="absolute inset-0 bg-white opacity-50 pointer-events-none z-0"
              ></span>
              <div class="flex flex-col z-10">
                <Loader width="60" height="60" strokeWidth="7px" />
                <span>Loading...</span>
              </div>
            </div>

            <ProposalsCard
              :proposal="proposal"
              v-for="(proposal, index) in proposals"
              :key="index"
            />

            <div
              class="bg-yellow-100 p-4 rounded-md"
              v-if="proposals.length === 0"
            >
              <span>No proposals found</span>
            </div>

            <Pagination
              :page="page"
              :perPage="perPage"
              :total="total"
              @update:currentPage="page = $event"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full order-1 md:order-2 md:w-[275px] flex flex-col gap-4" v-if="loadingProposals">
      <div class="flex bg-white shadow rounded-md p-6">
        <div class="flex h-[100px] gap-2 w-full">
          <Skeleton class="w-24 h-full rounded" />

          <div class="flex flex-col justify-center w-full gap-2">
            <Skeleton class="w-20 h-8 rounded" />
            <Skeleton class="w-20 h-4 rounded" />
          </div>
        </div>
      </div>

      <div class="flex bg-white shadow rounded-md p-6">
        <div class="flex h-[100px] gap-2 w-full">
          <Skeleton class="w-24 h-full rounded" />

          <div class="flex flex-col justify-center w-full gap-2">
            <Skeleton class="w-20 h-8 rounded" />
            <Skeleton class="w-20 h-4 rounded" />
          </div>
        </div>
      </div>

      <div class="flex bg-white shadow rounded-md p-6">
        <div class="flex h-[100px] gap-2 w-full">
          <Skeleton class="w-24 h-full rounded" />

          <div class="flex flex-col justify-center w-full gap-2">
            <Skeleton class="w-20 h-8 rounded" />
            <Skeleton class="w-20 h-4 rounded" />
          </div>
        </div>
      </div>
    </div>

    <JobsCounter v-else />
  </div>
</template>
