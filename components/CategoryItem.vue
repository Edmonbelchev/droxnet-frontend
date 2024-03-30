<script setup lang="ts">

defineProps({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
})


</script>

<template>
    <div class="w-64 mr-8 mb-10 border p-6 items-center flex flex-col group overflow-hidden">
        <img :src="image" alt="Category Image" class="group-hover:-translate-y-28 relative duration-500">
        <h2 class="group-hover:-translate-y-16 relative duration-500">{{ title }}</h2>
        <p class="relative bottom-[-150px] group-hover:-translate-y-36 duration-500">{{ description }}</p>
    </div>
</template>