<template>
  <div class="rounded-md gap-8 flex flex-col">
    <SkeletonUserCard v-for="index in 10" :key="index" />
  </div>
</template>