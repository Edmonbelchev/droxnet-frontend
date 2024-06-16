<script setup>
defineProps({
    experience: {
        type: Object,
        required: true
    }
})

</script>



<template>
    <div class="px-10 py-8">

        <div class="mb-5">
            <h3 class="text-black text-base"> {{ experience.job_title }} </h3>
        </div>
        <ul class="mb-5">
            <li>{{ experience.company_name }}</li>
            <li>{{ experience.start_date }} {{ experience.end_date }}</li>
        </ul>

        <div>
            {{ experience.description }}
        </div>
    </div>
</template>