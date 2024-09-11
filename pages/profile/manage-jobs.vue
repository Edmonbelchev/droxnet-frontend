<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();

const firstComponentLoad = ref(true);
const loading: Ref<boolean> = ref(false);

const jobs: Ref<Array<Object>> = ref([]);
const perPage: Ref<number> = ref(8);
const page: Ref<number> = ref(1);
const total: Ref<number> = ref(0);

const retrieveUserJobs = async () => {
  loading.value = true;

  const response = await fetchUserJobs(perPage.value, page.value);

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

      <div class="bg-[--background-color] py-8 px-4 md:py-10 md:px-16 md:min-h-[1200px] flex flex-col md:flex-row justify-center gap-8" v-if="firstComponentLoad">
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
              Manage Jobs
            </h2>
          </div>

          <div class="flex flex-col p-4 md:p-6 gap-2">
            <h4
              class="bg-[--background-color] text-[--text-color] py-3 px-4 mb-4 border-l-4 border-[--primary-color] text-base"
            >
              Posted Jobs
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

              <UserJobCard
                :job="job"
                v-for="(job, index) in jobs"
                :key="index"
              />

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
