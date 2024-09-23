<script setup>
definePageMeta({
  middleware: "auth",
  breadcrumb: "Company Grid",
});
</script>

<template>
  <NuxtLayout name="default">
    <AppBreadcrumbs title="Company Grid" />
  </NuxtLayout>
</template>
