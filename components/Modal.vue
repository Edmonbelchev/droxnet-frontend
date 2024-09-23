<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "submit"]);

const isVisible = ref(false);
const modalRef = ref<HTMLElement | null>(null);

watch(
  () => props.isOpen,
  (newValue: boolean) => {
    if (newValue) {
      setTimeout(() => {
        isVisible.value = true;
      }, 10);
    } else {
      handleClose();
    }
  }
);

watch(
  () => props.loading,
  (newValue: boolean) => {
    if (!newValue) {
      handleClose();
    }
  }
);

const handleClose = () => {
  isVisible.value = false;
  setTimeout(() => {
    emit("close");
  }, 150);
};

const handleSubmit = () => {
  emit("submit");
};

const handleOutsideClick = (event: MouseEvent) => {
  if (modalRef.value && !modalRef.value.contains(event.target as Node) && !props.loading) {
    handleClose();
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleOutsideClick);
});
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
      >
        <div
          ref="modalRef"
          class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 ease-out z-50"
          :class="isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
        >
          <h2 class="text-xl font-bold mb-4">Confirmation</h2>
          <p class="mb-6">{{ message }}</p>
          <div class="flex justify-end space-x-4">
            <button
              @click="handleClose"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-150 ease-in-out"
              :class="loading ? 'pointer-events-none opacity-50' : 'cursor-pointer'"
            >
              Cancel
            </button>
            <button
              @click="handleSubmit"
              class="flex items-center justify-center gap-2 px-4 py-2 bg-[--primary-color] text-white rounded hover:bg-red-600 transition duration-150 ease-in-out"
            >
              <Loader width="14" v-if="loading" />
              Submit
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>