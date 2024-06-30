<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const users: Ref<Array<Object>> = ref([]);
const page: Ref<Number | any> = ref(1);
const perPage: Ref<Number | any> = ref(5);
const total: Ref<Number | any> = ref(0);
const loadingPage = ref(false);
const skeletonLoading = ref(true);

const form: Ref<any> = ref({
  countries: [],
  category: [],
  type: [],
  hourly_rate: {
    start: 0,
    end: 100,
  },
  language: [],
});

/* Retrieve users */
const retrieveUsers = async (firstPageLoad: Boolean = false) => {
  if(!firstPageLoad) loadingPage.value = true;

  const response = await fetchUsers(page.value, perPage.value, form.value);

  if (response.status.value === "success") {
    users.value = response.data.value.data;
    total.value = response.data.value.meta.total;
  }

  if(!firstPageLoad) return loadingPage.value = false;

  return skeletonLoading.value = false;
};

/* Calculate the start and end range */
const startRange = computed(() => (page.value - 1) * perPage.value + 1);
const endRange = computed(() => Math.min(page.value * perPage.value, total.value));

/* Watch for page and perPage changes */
watch([page, perPage], async () => {
  await retrieveUsers();
});

/* Submit fitler and re-run the retrieve user method */
const submitFilter = () => {
  retrieveUsers();
};

/* On mounted, retrieve users */
onMounted(() => {
  retrieveUsers(true);
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex bg-[--background-color] justify-center py-20">
      <div class="flex max-w-[1140px] w-full">
        <div class="flex flex-col w-1/3 px-4">
          <UserFilter @submit="submitFilter" :form="form" :loading="loadingPage" />
        </div>

        <div class="relative flex flex-col w-3/4 px-4">
          <div class="flex flex-col gap-2 absolute inset-0 w-full h-full justify-center items-center z-10 cursor-wait" v-if="loadingPage">
            <Loader width="60" height="60" strokeWidth="7px" />
            <span>Loading...</span>
          </div>

          <div class="flex text-base mb-4">
            <span>{{ startRange }} - {{ endRange }} of {{ total }} results</span>
          </div>

          <SkeletonUserListing v-if="skeletonLoading" />

          <UserListing 
            :users="users" 
            :loading="loadingPage"
            v-else
          />

          <div class="flex justify-center mt-8">
            <Pagination
              :page="page"
              :perPage="perPage"
              :total="total"
              @update:currentPage="page = $event"
              v-if="!skeletonLoading && total > 0"
            />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
