<script setup lang="ts">
defineProps<{
    users: Array<Object>,
    loading: Boolean
}>()
</script>

<template>
    <div class="rounded-md gap-8 flex flex-col">
        <UserCard v-for="user in users" :key="user.id" :user="user" :loading="loading" />
    </div>
</template>