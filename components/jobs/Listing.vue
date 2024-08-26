<script setup lang="ts">
defineProps<{
    jobs: Array<Object>,
    loading: Boolean
}>()
</script>

<template>
    <div class="rounded-md gap-8 flex flex-col">
        <JobsCard v-for="(job, index) in jobs" :key="index" :job="job" :loading="loading" />
    </div>
</template>