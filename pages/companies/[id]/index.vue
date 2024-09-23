<script setup>
definePageMeta({
  middleware: "auth",
  breadcrumb: "Company Detail",
});

const route = useRoute();
const user = ref({});
const loadingUser = ref(true);

const retrieveUser = async () => {
  const response = await fetchUser(route.params.id);

  if (response.status.value === "success") {
    user.value = response.data.value.data;
  }

  loadingUser.value = false;
};

onMounted(async () => {
  await retrieveUser();
});
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex flex-col bg-[--background-color]" v-if="loadingUser">
      <SkeletonUserDetails />
    </div>

    <div class="flex flex-col bg-[--background-color]" v-else>
      <AppBreadcrumbs title="Company Details" />
      
      <CompanyDetails :user="user" :loading="loadingUser" />
    </div>
  </NuxtLayout>
</template>
