<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const route = useRoute();

const authStore = useAuthStore();

const job = ref();
const hasLoaded: Ref<boolean> = ref(false);

const retrieveJob = async () => {
  const response = await fetchJob(route.params.id);

  if (response.status.value === "success") {
    job.value = response.data.value.data;
  }

  hasLoaded.value = true;
};

onMounted(async () => {
  await retrieveJob();
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="relative">
      <ProfileSidebarMenu :user="authStore.user" />
      <FormElementsPostJob :job="job" :jobHasLoaded="hasLoaded" :key="hasLoaded" />
    </div>
  </NuxtLayout>
</template>
