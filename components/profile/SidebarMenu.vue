<script setup lang="ts">
defineProps({
  user: {
    type: Object,
    required: true,
  },
});

let sideBarIsActive = ref(false);

const sideBarMenuList = profileSidebarMenuItems();

const activeDropdown = ref(-1);

const toggleDropdown = (index: number) => {
  activeDropdown.value = activeDropdown.value === index ? -1 : index;
};
</script>

<template>
  <div
    class="flex flex-col absolute h-full bg-white left-0 top-0 z-10 shadow-md transition-all duration-300 ease-in-out"
    :class="{
      'w-[270px]': sideBarIsActive,
      'w-[0px] md:w-[50px]': !sideBarIsActive,
    }"
  >
    <button
      class="rounded-full bg-white text-[--text-color] h-10 w-10 absolute text-xl -right-7 top-3 md:-right-5 md:top-5 md:text-lg shadow-xl"
      type="button"
      @click="sideBarIsActive = !sideBarIsActive"
    >
      <Icon
        :name="
          sideBarIsActive
            ? 'heroicons-solid:arrow-left'
            : 'heroicons-solid:menu'
        "
      />
    </button>

    <div class="flex flex-col overflow-hidden">
      <figure class="h-[150px] w-full block">
        <img
          class="w-full h-full object-cover bg-gray-200"
          :src="user.profile_banner"
          alt=""
        />
      </figure>

      <div
        class="flex flex-col items-center justify-center px-1 pb-10"
        :class="{ '-mt-14': sideBarIsActive, '-mt-5': !sideBarIsActive }"
      >
        <figure class="mb-4">
          <img
            :src="user.profile_image"
            :class="[
              'border-white rounded-full shadow-xl transition-all duration-300 ease-in-out bg-gray-200',
              {
                'w-24 h-24 border-[6px]': sideBarIsActive,
                'w-10 h-10 border-[4px]': !sideBarIsActive,
              },
            ]"
          />
        </figure>

        <div class="flex flex-col" v-if="sideBarIsActive">
          <h3 class="text-center text-[--text-color] text-lg">
            {{ user.first_name }}
            <span v-if="user.last_name">
              {{ user.last_name }}
            </span>
          </h3>

          <p class="text-center text-[--text-gray] text-sm mb-6">
            {{ user.email }}
          </p>

          <button type="button" class="primary-button">Post a Job</button>
        </div>
      </div>

      <div class="flex flex-col overflow-y-scroll no-scrollbar">
        <ul>
          <li
            class="py-3 flex flex-col relative transition-all duration-300"
            :class="[
              {
                'bg-gray-100': activeDropdown == index,
              },
              sideBarIsActive ? 'px-4' : 'px-2 items-center',
            ]"
            v-for="(item, index) in sideBarMenuList"
            :key="index"
          >
            <a
              href="#"
              class="flex gap-4 items-center text-sm"
              :class="{ 'pr-6': sideBarIsActive }"
            >
              <Icon :name="item.icon" v-if="item.icon" />
              <span v-if="sideBarIsActive">
                {{ item.title }}
              </span>
            </a>

            <button
              type="button"
              class="absolute right-0 top-3 z-1 px-4"
              v-if="item.dropdown && sideBarIsActive"
              @click="toggleDropdown(index)"
            >
              <Icon name="octicon:chevron-right" />
            </button>

            <div
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :class="{
                'max-h-0': activeDropdown != index,
                'max-h-[200px]': activeDropdown == index,
              }"
              v-if="item.dropdown && sideBarIsActive"
            >
              <ul class="pl-8 pt-2">
                <li
                  class="border-l border-dashed border-gray-400 pl-4 flex items-center relative"
                  v-for="(dropdownItem, index) in item.dropdown"
                  :key="index"
                >
                  <hr
                    class="absolute left-0 top-0 bottom-0 my-auto w-4 border-dashed border-gray-400"
                  />

                  <a href="#" class="py-2 pl-2 text-xs flex-1">
                    {{ dropdownItem.title }}
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>