<script setup>
defineProps({
  className: {
    type: String,
    default: 'w-auto',
  },
});
</script>


<template>
    <NuxtLink to="/">
      <img :class="className" src="/images/logo.webp" alt="Logo" />
    </NuxtLink>
</template>