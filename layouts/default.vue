<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
    <header class="relative z-[60] border-b border-[#eee]" ref="header">
        <NavigationNavbar />
    </header>
    <slot />

    <Footer ref="footer" />
</template>
  