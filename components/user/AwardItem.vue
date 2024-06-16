<script setup>
defineProps({
    award: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div class="flex mb-[30px]">
        <img class="rounded-md" :src="award.image" alt="">
    <div class="px-6">
        <h3 class="p text-black">
            {{ award.title }}
        </h3>
        <span class="text-inherit">
            {{ award.date }}
        </span>
    </div>
    </div>
</template>