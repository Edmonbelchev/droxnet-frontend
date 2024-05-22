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

      <div class="bg-[--background-color] p-10">
        <ProfileDetails :user="authStore.user" />
      </div>
    </div>
  </NuxtLayout>
</template>
