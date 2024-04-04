<script setup lang="ts">
defineProps({
  dropdownElements: {
    type: Object,
  },
});

const dropdownLeft = ref(false);
const dropdownMenuRef = ref(null);

const checkDropdownPosition = () => {
  const dropdownMenu = dropdownMenuRef.value;
  if (dropdownMenu) {
    const rect = dropdownMenu.getBoundingClientRect();
    dropdownLeft.value = Number((rect.right + rect.width) + 150) < window.innerWidth;
  }
}

onMounted(() => {
  checkDropdownPosition();
});
</script>

<template>
  <ul
    ref="dropdownMenuRef"
    :class="[
      'text-base',
      'absolute',
      {
        'left-0': dropdownLeft,
        'right-0': !dropdownLeft,
      },
      'top-[130px]',
      'dropdown-menu',
      'w-[255px]',
      'bg-white',
      'shadow',
      'shadow-black/25',
      'border-t-2',
      'border-[--primary-color]',
      'rounded-b-md',
      'transition-all',
      'opacity-0',
      'duration-300',
      'invisible',
      'group-hover/parent:top-[72px]',
      'group-hover/parent:opacity-100',
      'group-hover/parent:visible',
    ]"
    v-if="dropdownElements"
  >
    <li
      class="relative group z-10"
      v-for="(element, index) in dropdownElements"
      :key="index"
    >
      <NuxtLink
        :to="element.route"
        class="relative flex justify-between text-[--gray-color] px-4 py-3 border-b text-sm hover:bg-gray-100/50 transition-all duration-300 hover:text-black"
      >
        {{ element.text }}

        <span v-if="element.dropdownElements">
          <Icon class="text-lg" name="heroicons-solid:chevron-right" />
        </span>
      </NuxtLink>

      <ul
        ref="dropdownMenuRef"
        class="text-base absolute top-[130px] dropdown-menu w-[255px] bg-white shadow shadow-black/25 rounded-b-md transition-all opacity-0 duration-300 invisible group-hover:top-[0px] group-hover:opacity-100 group-hover:visible"
        :class="{ 'left-[255px]': dropdownLeft, 'right-[255px]': !dropdownLeft }"
      >
        <li
          v-for="(subElement, index) in element.dropdownElements"
          :key="index"
        >
          <NuxtLink
            :to="subElement.route"
            class="relative text-[--gray-color] px-4 py-3 block border-b text-sm hover:bg-gray-100/50 transition-all duration-300 hover:text-black"
          >
            {{ subElement.text }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>