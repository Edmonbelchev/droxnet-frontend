<script setup>
defineProps({
    education: {
        type: Object,
        required: true
    }
})

</script>



<template>
    <div class="px-10 py-8">

        <div class="mb-5">
            <h3 class="text-black text-base"> {{ education.job_title }} </h3>
        </div>
        <ul class="mb-5">
            <li>{{ education.company_name }}</li>
            <li>{{ education.start_date }} {{ education.end_date }}</li>
        </ul>

        <div>
            {{ education.description }}
        </div>
    </div>
</template>