<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  breadcrumb: "Users",
});

const users: Ref<Array<object>>     = ref([]);
const page: Ref<number>             = ref(1);
const perPage: Ref<number>          = ref(5);
const total: Ref<number>            = ref(0);
const loadingPage: Ref<boolean>     = ref(false);
const skeletonLoading: Ref<boolean> = ref(true);

const appliedFilters: Ref = ref({
  countries: [],
  category: [],
  type: [],
  hourly_rate: {
    start: 0,
    end: 100,
  },
  language: [],
});

const currentForm: Ref = ref({ ...appliedFilters.value });

/* Retrieve users */
const retrieveUsers = async (firstPageLoad: boolean = false) => {
  if (!firstPageLoad) loadingPage.value = true;

  const response = await fetchUsers(page.value, perPage.value, appliedFilters.value);

  if (response.status.value === "success") {
    users.value = response.data.value.data;
    total.value = response.data.value.meta.total;
  }

  if (!firstPageLoad) loadingPage.value = false;

  else skeletonLoading.value = false;
};

/* Calculate the start and end range */
const startRange = computed(() => (page.value - 1) * perPage.value + 1);
const endRange   = computed(() => Math.min(page.value * perPage.value, total.value));

/* Watch for page and perPage changes */
watch([page, perPage], async () => {
  await retrieveUsers();
});

/* Apply filters and re-run the retrieve user method */
const applyFilters = async () => {
  appliedFilters.value = JSON.parse(JSON.stringify(currentForm.value));
  await retrieveUsers();
};

/* Clear all filters */
const clearAllFilters = async () => {
  const emptyForm = {
    countries: [],
    category: [],
    type: [],
    hourly_rate: {
      start: 0,
      end: 100,
    },
    language: [],
  };

  currentForm.value = JSON.parse(JSON.stringify(emptyForm));

  appliedFilters.value = JSON.parse(JSON.stringify(emptyForm));

  await retrieveUsers();
};

/* Remove individual filter */
const removeFilter = async (filter: { key: string, value: any }) => {
  if (filter.key === 'hourly_rate') {
    appliedFilters.value.hourly_rate = { start: 0, end: 100 };
    currentForm.value.hourly_rate = { start: 0, end: 100 };
  } else {
    appliedFilters.value[filter.key] = appliedFilters.value[filter.key].filter((v: any) => v !== filter.value);
    currentForm.value[filter.key] = [...appliedFilters.value[filter.key]];
  }

  await retrieveUsers();
};

/* On mounted, retrieve users */
onMounted(async () => {
  await retrieveUsers(true);
});
</script>

<template>
  <NuxtLayout name="default">
    <AppBreadcrumbs title="Search Result" />

    <div class="flex bg-[--background-color] justify-center py-20">
      <div class="flex max-w-[1140px] w-full">
        <div class="flex flex-col w-1/3 px-4">
          <UserFilter
            @submit="applyFilters"
            :form="currentForm"
            :loading="loadingPage"
          />
        </div>

        <div class="relative flex flex-col w-3/4 px-4 h-fit">
          <div
            class="flex flex-col gap-2 absolute inset-0 w-full h-full justify-center items-center z-10 cursor-wait"
            v-if="loadingPage"
          >
            <Loader width="60" height="60" strokeWidth="7px" />
            <span>Loading...</span>
          </div>

          <FilterAppliedValues
            :applied-filters="appliedFilters"
            @clear-all="clearAllFilters"
            @remove-filter="removeFilter"
          />

          <div class="flex text-base mb-4">
            <span>{{ startRange }} - {{ endRange }} of {{ total }} results</span>
          </div>

          <SkeletonUserListing v-if="skeletonLoading" />

          <UserListing :users="users" :loading="loadingPage" v-else />

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