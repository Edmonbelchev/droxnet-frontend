<script setup>
defineProps({
    navigationItems: {
        type: Array,
        required: true,
    },
    className: {
        type: String,
        default: "hidden md:flex md:gap-6",
    },
})
</script>

<template>
    <ul :class="className">
        <NavigationDesktopNavItem
            :text="item.text"
            :route="item.route"
            :dropdownElements="item.dropdownElements"
            v-for="(item, index) in navigationItems"
            :key="index"
        />
    </ul>
</template>