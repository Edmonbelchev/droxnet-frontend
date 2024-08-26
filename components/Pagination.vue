<script setup lang="ts">
const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:currentPage"]);

const totalPages = computed(() => Math.ceil(props.total / props.perPage));

const pages = computed(() => {
  const pagesArray: (number | string)[] = [];
  const current = props.page;
  const maxButtons = 6;

  if (totalPages.value <= maxButtons) {
    for (let i = 1; i <= totalPages.value; i++) {
      pagesArray.push(i);
    }
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 4; i++) {
        pagesArray.push(i);
      }
      pagesArray.push("...");
      pagesArray.push(totalPages.value);
    } else if (current > totalPages.value - 3) {
      pagesArray.push(1);
      pagesArray.push("...");
      for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
        pagesArray.push(i);
      }
    } else {
      pagesArray.push(1);
      pagesArray.push("...");
      pagesArray.push(current - 1);
      pagesArray.push(current);
      pagesArray.push(current + 1);
      pagesArray.push("...");
      pagesArray.push(totalPages.value);
    }
  }
  return pagesArray;
});

const currentPage: Ref<number> = ref(props.page);

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit("update:currentPage", page);
  }
};

watch(
  () => props.page,
  (newPage: number) => {
    currentPage.value = newPage;
  }
);
</script>

<template>
  <div class="flex justify-between w-full">
    <button
      type="button"
      class="border rounded-md p-2 w-11 h-11 flex justify-center items-center bg-white text-[--text-gray]"
      :class="{
        'opacity-50' : currentPage === 1,
        'hover:bg-[--primary-color] hover:text-white hover:border-[--primary-color] duration-300' : currentPage !== 1,
      }"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      <Icon name="fa6-solid:chevron-left" />
    </button>

    <div class="flex gap-2">
      <button
        type="button"
        v-for="page in pages"
        :key="page"
        class="border rounded-md p-2 w-11 h-11 flex justify-center items-center text-[--text-gray] hover:bg-[--primary-color] hover:text-white hover:border-[--primary-color] duration-300"
        :class="{
          'bg-[--primary-color] text-white border-[--primary-color]' : currentPage === page,
          'opacity-50' : page === '...',
          'bg-white' : page !== '...' && currentPage !== page
        }"
        :disabled="page === '...'"
        @click="page !== '...' && changePage(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      type="button"
      class="border rounded-md p-2 w-11 h-11 flex justify-center items-center bg-white text-[--text-gray] "
      :class="{
        'opacity-50' : currentPage === totalPages || totalPages === 0,
        'hover:bg-[--primary-color] hover:text-white hover:border-[--primary-color] duration-300' : currentPage !== totalPages && totalPages !== 0,
      }"
      :disabled="currentPage === totalPages || totalPages === 0"
      @click="changePage(currentPage + 1)"
    >
      <Icon name="fa6-solid:chevron-right" />
    </button>
  </div>
</template>
  