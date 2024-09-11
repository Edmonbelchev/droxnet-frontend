<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const authStore = useAuthStore();

const firstComponentLoad = ref(true);
const loading: Ref<boolean> = ref(false);

const jobs: Ref<Array<Object>> = ref([]);
const perPage: Ref<number> = ref(8);
const page: Ref<number> = ref(1);
const total: Ref<number> = ref(0);
const status: Ref<string> = ref(route.query.status as string);

const retrieveUserJobs = async () => {
  loading.value = true;

  const response = await fetchUserJobs(perPage.value, page.value, status.value);

  if (response.status.value === "success") {
    jobs.value = response.data.value.data;
    total.value = response.data.value.meta.total;
  }

  loading.value = false;
};

/* Watch for page and perPage changes */
watch([page, perPage], async () => {
  await retrieveUserJobs();
});

onMounted(async () => {
  await retrieveUserJobs();
  firstComponentLoad.value = false;
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="relative">
      <ProfileSidebarMenu :user="authStore.user" />

      <div
        class="bg-[--background-color] py-8 px-4 md:py-10 md:px-16 md:min-h-[1200px] flex flex-col md:flex-row justify-center gap-8"
        v-if="firstComponentLoad"
      >
        <SkeletonManageJobs />
      </div>

      <div
        class="bg-[--background-color] py-8 px-4 md:py-10 md:px-16 md:min-h-[1200px] flex flex-col md:flex-row justify-center gap-8"
        v-else
      >
        <div
          class="flex flex-col order-2 md:order-1 w-full md:w-[1014px] shadow-lg bg-white rounded-md"
        >
          <div class="flex flex-col rounded-md w-full">
            <h2
              class="border-b p-4 md:p-6 text-[--text-color] text-base md:text-lg"
            >
              All Jobs
            </h2>
          </div>

          <div class="flex flex-col p-4 md:p-6 gap-2">
            <h4
              class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
              v-if="status === 'completed'"
            >
              Completed Jobs
            </h4>

            <h4
              class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
              v-else-if="status === 'cancelled'"
            >
              Cancelled Jobs
            </h4>

            <h4
              class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
              v-else-if="status === 'ongoing'"
            >
              Ongoing Jobs
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

              <div
                v-if="jobs.length === 0"
                class="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h4 class="text-xl font-semibold text-gray-700 mb-2">
                  No jobs found
                </h4>
                <p class="text-gray-500 text-center">
                  There are currently no jobs matching your criteria. Try
                  adjusting your filters or check back later.
                </p>
              </div>

              <div v-if="status === 'completed'">
                <UserCompletedJobCard
                  :job="job"
                  :key="index"
                  v-for="(job, index) in jobs"
                />
              </div>

              <div v-else-if="status === 'ongoing'">
                <UserOngoingJobCard
                  :job="job"
                  :key="index"
                  v-for="(job, index) in jobs"
                />
              </div>

              <div v-else-if="status === 'cancelled'">
                <UserCancelledJobCard
                  :job="job"
                  :key="index"
                  v-for="(job, index) in jobs"
                />
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

        <JobsCounter />
      </div>
    </div>
  </NuxtLayout>
</template>
