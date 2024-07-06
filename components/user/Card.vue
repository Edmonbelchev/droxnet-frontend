<script setup lang="ts">
defineProps<{
  user: Array<Object>;
  loading: Boolean;
}>();
</script>

<template>
  <div
    class="flex flex-col bg-white p-4 rounded-md"
    :class="{ 'animate-pulse': loading }"
  >
    <div class="flex gap-4 w-full">
      <NuxtLink :to="`/users/${user.id}`" class="text-sm text-[--text-color]">
        <figure
          class="w-[100px] h-[100px] bg-[--background-color] rounded-md overflow-hidden"
        >
          <img
            class="object-cover h-full w-full"
            :src="user.profile_image"
            v-if="user.profile_image"
          />
          <IconsAvatar width="100px" height="100px" fill="#d1d5db" v-else />
        </figure>
      </NuxtLink>

      <div class="flex flex-col">
        <NuxtLink :to="`/users/${user.id}`" class="text-sm text-[--text-color]">
          {{ user.first_name }} {{ user.last_name }}
        </NuxtLink>

        <h2 class="text-base text-[--text-color] mb-2" v-if="user.tagline">{{ user.tagline }}</h2>

        <div
          class="flex justify-center mt-2 md:justify-start sm:flex gap-2 text-base"
        >
          <span class="flex items-center gap-2 text-xs" v-if="user.hourly_rate">
            <Icon name="ph:money-bold" class="text-sm" />

            ${{ user.hourly_rate }} / hr
          </span>
          <span
            class="flex items-center pr-2 border-r-[1px] gap-1 text-xs"
            :class="{ 'border-l-[1px] pl-2': user.hourly_rate }"
            v-if="user.country"
          >
            <img
              :src="countryFlag(user.country)"
              :alt="user.country"
              class="min-w-[18px]"
            />
            {{ user.country }}
          </span>

          <button
            type="button"
            class="flex items-center gap-1 text-red-400 text-xs"
          >
            <Icon name="mdi:heart" class="text-sm" />

            Save
          </button>
        </div>
      </div>

      <div class="flex flex-col items-center gap-1 ml-auto">
        <div class="flex items-end">
          <Icon name="ic:round-star" class="text-[#fecb02] text-xs" />
          <Icon name="ic:round-star" class="text-[#fecb02] text-sm" />
          <Icon name="ic:round-star" class="text-[#fecb02] text-md" />
          <Icon name="ic:round-star" class="text-[#fecb02] text-lg" />
          <Icon name="ic:round-star" class="text-[#fecb02] text-xl" />
        </div>
        <div class="flex">
          <span class="text-lg text-[--text-color]">4.5/</span>
          <span class="text-md text-[--gray-color] pt-2">5</span>
        </div>
        <NuxtLink :to="`/users/${user.id}`" class="text-xs text-[--blue-color]">
          (860 Feedback)
        </NuxtLink>
      </div>
    </div>

    <p v-if="user.about" class="mt-4">
      {{ user.about }}
    </p>

    <div
      class="mt-4 gap-2 flex flex-wrap"
      v-if="user.skills && user.skills.length > 0"
    >
      <a
        href="#"
        class="text-xs py-2 px-4 border rounded-[30px] text-[--gray-color]"
        v-for="(skill, index) of user.skills"
        :key="index"
      >
        {{ skill.name }}
      </a>
    </div>
  </div>
</template>