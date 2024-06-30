<script setup>
defineProps({
    experience: {
        type: Object,
        required: true
    },
    className: {
        type: String,
        default: "p-6 bg-white"
    }
})
</script>

<template>
    <div :class="className">
        <div class="mb-5">
            <h3 class="text-black text-base"> {{ experience.job_title }} </h3>
        </div>

        <div class="flex gap-4 mb-5">
            <div class="flex items-center gap-2 text-sm">
                <Icon name="ph:building-bold" />
                {{ experience.company_name }}
            </div>

            <div class="flex items-center gap-2">
                <Icon name="uiw:date" />

                <span class="text-sm">
                    {{ experience.start_date }} 
                    <span v-if="experience.end_date">- {{ experience.end_date }}</span>
                    <span v-else>- Till now</span>
                </span>
            </div>
        </div>

        <p>
            {{ experience.description }}
        </p>
    </div>
</template>