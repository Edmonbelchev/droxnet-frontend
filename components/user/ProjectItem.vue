<script setup>
defineProps({
    project: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div class="w-full px-10 md:w-2/4 lg:w-1/3 flex flex-col p-3">
        <img class="rounded-md" :src="project.image" alt="">
       <div class="p-5">
        <h3 class="text-black text-base">
            {{ project.title }}
        </h3>
        <span>
           <a class="text-blue-400" href=""> {{ project.information }}</a>
        </span>
       </div>
    </div>
</template>