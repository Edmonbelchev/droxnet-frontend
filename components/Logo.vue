<script setup>
defineProps({
  className: {
    type: String,
    default: 'w-auto',
  },
});
</script>


<template>
    <NuxtLink :class="className" to="/">
      <img src="/images/logo.webp" alt="Logo" />
    </NuxtLink>
</template>