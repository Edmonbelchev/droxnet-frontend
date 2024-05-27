<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
    <header class="relative z-10" ref="header">
        <NavigationNavbar />
    </header>
    <slot />

    <Footer ref="footer" />
</template>
  