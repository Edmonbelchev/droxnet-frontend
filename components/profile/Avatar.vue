<script setup lang="ts">
defineProps({
  avatar: {
    type: String,
  },
  className: {
    type: String,
    default: "w-9 h-9 rounded-full object-cover",
  },
});
</script>

<template>
  <img :class="className" :src="avatar" alt="User Logo" v-if="avatar" />
  <img :class="className" :src="`/images/user-login.webp`" alt="User Logo" v-else />
</template>