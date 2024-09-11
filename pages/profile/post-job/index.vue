<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();
</script>

<template>
  <NuxtLayout name="default">
    <div class="relative">
      <ProfileSidebarMenu :user="authStore.user" />
      <FormElementsPostJob />
    </div>
  </NuxtLayout>
</template>
