<script setup>
definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();
</script>

<template>
  <NuxtLayout name="default">

    <div class="relative">
      <ProfileSidebarMenu :user="authStore.user" />

      <div class="bg-[--background-color] py-8 px-4 md:py-10 md:px-16 md:min-h-[1200px]">
        <ProfileSettings />
      </div>
    </div>
  </NuxtLayout>
</template>
