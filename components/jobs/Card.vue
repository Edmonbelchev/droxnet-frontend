<script setup>
defineProps({
  heading: {
    type: String,
    required: true,
  },
  badge: String,
  text: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  professional: {
    type: String,
    required: true,
  },
  icon: String,
  folderIcon: String,
  clockIcon: String,
  heartIcon: String,
  jobIcon: String,
  national: String,
  typeTime: String,
  duration: String,
  job: String,
  save: String,
  aButton: String,
});
</script>

<template>
  <div class="overflow-hidden mb-10 bg-white rounded-lg transition-shadow duration-500 flex relative hover:shadow-xl">
    <span
      class="absolute top-0 left-0 w-10 h-10 z-50 border-t-[40px] border-r-[40px] border-r-transparent"
      :class="{
        'border-[#f1c40f]': badge == 'default',
        'border-[#e67e22]': badge == 'member',
        'border-[#2ecc71]': badge == 'premium',
      }"
      v-if="badge"
    >
    </span>

    <div class="w-4/6 py-10 px-10 relative">
      <span>
        <img
          src="https://amentotech.com/htmls/worktern/images/featured.png"
          alt=""
        />
      </span>

      <div class="flex items-center gap-2">
        <Icon
          name="material-symbols:check"
          class="text-white bg-green-400 rounded-full"
        /><a class="text-base font-semibold">{{ heading }}</a>
      </div>
      <h2 class="text-xl text-gray-600 my-3">{{ text }}</h2>
      <p class="text-gray-500">{{ description }}</p>
    </div>

    <div class="w-2/6 border-l">
      <ul class="py-10 px-8 leading-8">
        <li>
          <Icon name="fluent-emoji-flat:heavy-dollar-sign" class="w-4 h-4" />
          {{ professional }}
        </li>
        <li>
          <Icon :name="icon" class="w-5 h-5" />
          {{ national }}
        </li>
        <li>
          <Icon :name="folderIcon" class="text-blue-600 w-5 h-5" />
          {{ typeTime }}
        </li>
        <li>
          <Icon :name="clockIcon" class="text-red-600 w-4 h-4" />

          {{ duration }}
        </li>
        <li>
          <Icon :name="jobIcon" class="text-purple-500" />

          {{ job }}
        </li>
        <li>
          <Icon :name="heartIcon" />
          {{ save }}
        </li>
        <li class="flex justify-center mt-5">
          <a href="#" class="primary-button w-full">
            {{ aButton }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
