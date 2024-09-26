<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  breadcrumb: "Jobs",
});

const jobs: Ref<Array<object>>     = ref([]);
const page: Ref<number>             = ref(1);
const perPage: Ref<number>          = ref(8);
const total: Ref<number>            = ref(0);
const loadingPage: Ref<boolean>     = ref(false);
const skeletonLoading: Ref<boolean> = ref(true);

const appliedFilters: Ref = ref({
  countries: [],
  skills: [],
  type: [],
  budget_type: "any",
  budget: {
    start: 0,
    end: 100,
  },
  languages: [],
});

const currentForm: Ref = ref({
  countries: [],
  skills: [],
  budget_type: "any",
  budget: {
    start: 0,
    end: 100,
  },
  languages: [],
  duration: []
});

/* Retrieve jobs */
const retrieveJobs = async (firstPageLoad: boolean = false) => {
  if (!firstPageLoad) loadingPage.value = true;

  const response = await fetchJobs(perPage.value, page.value, appliedFilters.value);

  if (response.status.value === "success") {
    jobs.value = response.data.value.data;
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
  await retrieveJobs();
});

/* Apply filters and re-run the retrieve user method */
const applyFilters = async () => {
  appliedFilters.value = JSON.parse(JSON.stringify(currentForm.value));
  await retrieveJobs();
};

/* Clear all filters */
const clearAllFilters = async () => {
  const emptyForm = {
    countries: [],
    skills: [],
    budget_type: "any",
    budget: {
      start: 0,
      end: 100,
    },
    language: [],
    duration: []
  };

  currentForm.value = JSON.parse(JSON.stringify(emptyForm));

  appliedFilters.value = JSON.parse(JSON.stringify(emptyForm));

  await retrieveJobs();
};

/* Remove individual filter */
const removeFilter = async (filter: { key: string, value: any }) => {
  if (filter.key === 'budget') {
    appliedFilters.value.budget = { start: 0, end: 100 };
    currentForm.value.budget = { start: 0, end: 100 };
  } else {
    appliedFilters.value[filter.key] = appliedFilters.value[filter.key].filter((v: any) => v !== filter.value);
    currentForm.value[filter.key] = [...appliedFilters.value[filter.key]];
  }

  await retrieveJobs();
};

/* On mounted, retrieve jobs */
onMounted(async () => {
  await retrieveJobs(true);
});
</script>

<template>
  <NuxtLayout name="default">
    <AppBreadcrumbs title="Search Result" />

    <div class="flex bg-[--background-color] justify-center py-20">
      <div class="flex max-w-[1140px] w-full">
        <div class="flex flex-col w-1/3 px-4">
          <JobsFilter
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

          <JobsListing :jobs="jobs" :loading="loadingPage" v-else />

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