<script setup lang="ts">
const companies: Ref<Array<Object>> = ref([]);
const skeletonLoading: Ref<boolean> = ref(true);
const loading: Ref<boolean> = ref(false);

const retrieveSavedCompanies = async (): Promise<void> => {
  if (!skeletonLoading.value) {
    loading.value = true;
  }

  const response = await fetchSavedItems(1, 10, "user", true);

  companies.value = response.data.value.data;

  skeletonLoading.value = false;
  loading.value = false;
};

onMounted(async () => {
  await retrieveSavedCompanies();
});
</script>

<template>
  <div class="flex flex-col p-4 md:p-6 gap-2">
    <h4
      class="mb-2 bg-[--background-color] text-[--text-color] py-3 px-4 border-l-4 border-[--primary-color] text-base flex"
    >
      Saved Companies
    </h4>

    <div class="px-2">
      <div v-if="skeletonLoading">
        <SkeletonUserCard v-for="i in 10" :key="i" />
      </div>

      <div v-else-if="loading">
        <div class="flex items-center justify-center">
          <Loader />
        </div>
      </div>

      <div v-else class="flex flex-col gap-4">
        <CompanyCard v-for="(company, index) in companies" :key="index" :company="company" />
      </div>
    </div>
  </div>
</template>
