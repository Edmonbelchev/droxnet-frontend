<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
    <header class="relative z-10">
        <Navbar />
    </header>
    <slot />

    <Footer />
</template>
  