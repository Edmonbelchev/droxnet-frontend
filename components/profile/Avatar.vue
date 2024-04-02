<script setup lang="ts">
defineProps({
  avatar: {
    type: String,
  },
  class: {
    type: String,
    default: "w-9 h-9",
  },
});
</script>

<template>
  <img :class="class" :src="avatar" alt="User Logo" v-if="avatar" />
  <img :class="class" :src="`/images/user-login.webp`" alt="User Logo" v-else />
</template>