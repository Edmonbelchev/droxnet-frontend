<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const showMoreDescription = ref(false);
const toggleDescription = () => {
  showMoreDescription.value = !showMoreDescription.value;
};
</script>

<template>
  <div class="relative z-0">
    <img
      class="absolute w-full h-full min-h-[250px] md:min-h-[400px] object-cover animate-[fadeIn_300ms_ease-in_forwards]"
      :src="user.profile_banner"
      alt="Profile Banner"
      v-if="user.profile_banner"
    />
  </div>

  <div class="relative z-1 flex justify-center pt-40 md:pt-20 px-4">
    <div
      class="flex flex-col items-center max-w-[510px] md:items-start md:max-w-[1110px] bg-white rounded-lg p-6 md:p-4 lg:p-6 md:flex-row md:justify-between w-full"
    >
      <div
        class="flex flex-col w-full max-w-[255px] md:max-w-[180px] lg:max-w-[255px]"
      >
        <div
          class="relative mb-4 w-[255px] h-[255px] md:w-[180px] md:h-[180px] lg:w-[255px] lg:h-[255px] animate-[fadeIn_300ms_ease-in_forwards]"
        >
          <div
            class="rounded-[50%] absolute -top-[6px] -right-[6px] bg-[#57E50C] w-[20px] h-[20px] border-[3px] border-white"
          ></div>
          <img
            class="rounded-md w-full h-full object-cover"
            :src="user.profile_image"
            alt="User Avatar"
            v-if="user.profile_image"
          />
          <span
            class="bg-[#f3f4f6] h-full rounded-md flex justify-center items-center"
            v-else
          >
            <IconsAvatar width="150px" height="150px" fill="#d1d5db" />
          </span>
        </div>

        <div class="text-center flex flex-col">
          <h3
            class="text-lg text-[--text-color] mb-2"
          >
            <Icon name="lets-icons:check-fill" class="text-xl text-green-400" />
            {{ user.first_name }} {{ user.last_name }}
          </h3>

          <span>
            Feedback
            <button type="button" class="text-[--light-blue]">
              (860 Feedback)
            </button>
          </span>

          <p>Member since {{ user.created_at }}</p>

          <a :href="`mailto:${user.email}`" class="mb-2 text-[--light-blue]">{{
            user.email
          }}</a>

          <p class="text-red-400">
            <a href="#"> Report User </a>
          </p>
        </div>
      </div>

      <div
        class="sm:text-center md:text-start py-4 md:py-0 md:w-2/4 md:px-4 lg:px-6 min-w-[300px] xl:min-w-[530px]"
      >
        <p
          class="text-xl text-center md:text-start sm:text-2xl md:text-2xl font-bold text-black mb-3"
          v-if="user.tagline"
        >
          {{ user.tagline }}
        </p>

        <div
          class="flex justify-center mb-2 md:justify-start sm:flex gap-2 pb-3 text-base"
        >
          <span class="flex items-center gap-2 text-sm" v-if="user.hourly_rate">
            <Icon name="ph:money-bold" class="text-xl" />

            ${{ user.hourly_rate }} / hr
          </span>
          <span
            class="flex items-center pr-2 border-r-[1px] gap-1 text-sm"
            :class="{ 'border-l-[1px] pl-2': user.hourly_rate }"
            v-if="user.country"
          >
            <img
              :src="countryFlag(user.country)"
              :alt="user.country"
              class="min-w-[20px]"
            />
            {{ user.country }}
          </span>

          <button
            type="button"
            class="flex items-center gap-1 text-red-400 text-sm"
          >
            <Icon name="mdi:heart" class="text-xl" />

            Save
          </button>
        </div>

        <div class="relative lg:text-base">
          {{ user.about }}
        </div>
      </div>

      <div
        class="text-center h-full w-full md:w-1/3 lg:w-1/4 md:border-l border-gray-100 md:h-[calc(100%+2rem)] md:-mt-4 md:-mb-4 md:-mr-4 lg:h-[calc(100%+3rem)] lg:-mt-6 lg:-mb-6 lg:-mr-6"
      >
        <div class="flex">
          <div class="bg-gray-100 py-4 lg:py-9 px-2.5 w-1/2">
            <h3 class="text-lg lg:text-lg font-bold text-green-500">3</h3>
            <h4 class="text-sm">Ongoing Projects</h4>
          </div>

          <div class="py-4 lg:py-9 px-2.5 w-1/2">
            <h3 class="text-lg lg:text-lg font-bold text-blue-500">1503</h3>
            <h4 class="text-sm">Completed Projects</h4>
          </div>
        </div>

        <div class="flex mb-8">
          <div class="py-4 lg:py-9 px-2.5 w-1/2">
            <h3 class="text-lg lg:text-lg font-bold text-yellow-600">25 K</h3>
            <h4 class="text-sm">Cancelled Projects</h4>
          </div>

          <div class="bg-gray-100 py-4 lg:py-9 px-2.5 w-1/2">
            <h3 class="text-lg lg:text-lg font-bold text-purple-700">25 K</h3>
            <h4 class="text-sm">Saved Hours</h4>
          </div>
        </div>

        <a href="" class="primary-button">Send Offer</a>
      </div>
    </div>
  </div>
</template>
