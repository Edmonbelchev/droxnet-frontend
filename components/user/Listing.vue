<script setup lang="ts">
defineProps<{
    users: Array<Object>,
    loading: Boolean
}>()
</script>

<template>
    <div class="rounded-md gap-8 flex flex-col">
        <UserCard v-for="(user, index) in users" :key="index" :user="user" :loading="loading" />
    </div>
</template>