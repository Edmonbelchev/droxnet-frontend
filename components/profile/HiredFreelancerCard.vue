<script setup lang="ts">
defineProps<{
  user: any;
}>();
</script>

<template>
  <div class="flex bg-[--background-color] rounded-md">
    <div class="flex flex-col w-4/5 p-6">
      <div class="flex gap-1 items-center mb-2">
        <Icon name="lets-icons:check-fill" class="text-[--green-color]" />

        <h3 class="text-[--text-color]">
          {{ user.first_name }} {{ user.last_name }}
        </h3>
      </div>

      <NuxtLink :to="`/users/${user.uuid}`">
          <h2 class="text-[--text-color] text-base mb-3">
            {{ user.tagline }}
          </h2>
      </NuxtLink>

      <div class="flex justify-center md:justify-start sm:flex">
        <span class="flex items-center gap-2 text-xs" v-if="user.hourly_rate">
          <Icon name="ph:money-bold" class="text-xl" />

          ${{ user.hourly_rate }} / hr
        </span>
        <span
          class="flex items-center pr-2 mr-2 border-r-[1px] gap-1 text-xs"
          :class="{ 'border-l-[1px] pl-2 ml-2': user.hourly_rate }"
          v-if="user.country"
        >
          <img
            :src="countryFlag(user.country)"
            :alt="user.country"
            class="min-w-[20px]"
          />
          {{ countryName(user.country) }}
        </span>

        <button
          type="button"
          class="flex items-center gap-1 text-red-400 text-xs"
        >
          <Icon name="mdi:heart" class="text-lg" />

          Save
        </button>
      </div>
    </div>

    <div
      class="w-1/5 border-l-[7px] border-white flex flex-col justify-center items-center py-4"
    >
      <span class="text-[--green-color] font-bold text-lg p-4">Hired</span>

      <div class="flex relative w-full justify-center p-1">
        <div
          class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"
        ></div>
        <div
          class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/80 to-transparent z-10"
        ></div>

        <div
          class="border-[3px] border-white bg-white rounded-full w-8 h-8 overflow-hidden"
        >
          <img
            :src="user.profile_image"
            :alt="user.name"
            class="rounded-full w-8 h-8 object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>