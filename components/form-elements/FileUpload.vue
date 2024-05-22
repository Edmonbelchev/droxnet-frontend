<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "profile-avatar",
  },
  fileName: {
    type: String,
    default: "Profile Avatar",
  }
});

const emit = defineEmits(["update:modelValue"]);

const fileErrorMessage: any = ref("");

const previewFile: Ref = ref(null);
const uploadedFile: Ref = ref(null);
const fileDraggedOver = ref(false);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  // File extension validation
  const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
  const validExtension = allowedExtensions.some((ext) =>
    file?.name.toLowerCase().endsWith(`.${ext}`)
  );

  if (!validExtension) {
    // Invalid file extension, handle accordingly (e.g., show an error message)
    fileErrorMessage.value =
      "Invalid file extension. Only PNG, JPG, JPEG, and WEBP files are allowed.";
    return;
  } else {
    fileErrorMessage.value = "";
  }

  // File size validation
  const maxSizeInBytes = 10000;
  // maxSizeInBytes * 1024 | 10MB
  if (file && file.size > maxSizeInBytes * 1024) {
    // File size exceeds the limit, handle accordingly (e.g., show an error message)
    fileErrorMessage.value = "File size exceeds the limit of 10MB.";
    return;
  } else {
    fileErrorMessage.value = "";
  }

  // If both extension and size are valid, proceed with the file
  emit("update:modelValue", file);
  // Set the file to the uploadedFile ref in order to show size and name of the file
  uploadedFile.value = file;

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      previewFile.value = reader.result as string;
    };
    
    reader.readAsDataURL(file);

    fileDraggedOver.value = false;
  }
};

const handleDragOver = (event: Event) => {
  event.preventDefault(); // Prevent default behavior (e.g., open as a link for some browsers)
  fileDraggedOver.value = true;
};

const handleDragLeave = (event: Event) => {
  event.preventDefault(); // Prevent default behavior (e.g., open as a link for some browsers)
  fileDraggedOver.value = false;
};

const removeFile = () => {
  emit("update:modelValue", null);
  previewFile.value = null;
};
</script>

<template>
  <label
    :for="id"
    class="border-dashed border-2 p-4 flex gap-8 items-center relative"
    :class="fileDraggedOver ? 'border-[--primary-color]' : 'border-gray-200'"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
  >
    <input
      type="file"
      :name="name"
      :id="id"
      class="absolute w-full h-full inset-0 opacity-0 cursor-copy"
      accept=".png,.jpg,.jpeg,.webp"
      @change="handleFileChange"
    />

    <span
      class="bg-[--green-color] text-white px-8 py-3 rounded-md uppercase"
      >Select files</span
    >

    Drop files here to upload
  </label>

  <p
    class="mt-2 text-sm text-red-400 block animate-fade"
    v-html="fileErrorMessage"
    v-if="fileErrorMessage"
  ></p>

  <div v-if="previewFile || props.modelValue" :class="`${className} w-full border mt-4`">
    <img
      :src="previewFile ?? props.modelValue"
      alt="Preview File"
      :class="`object-cover w-full h-full`"
    />
    <div class="flex flex-col gap-2 p-2 pr-6 relative">
      <span class="text-xs text-[--text-color]" v-if="uploadedFile">
        {{ uploadedFile.name }}
      </span>

      <span class="text-xs text-[--text-color]" v-else>
        {{ fileName }}
      </span>

      <span class="text-xs italic" v-if="uploadedFile">
        File size: {{ uploadedFile.size }}
      </span>

      <button
        type="button"
        class="text-[--text-color] text-sm underline absolute right-3 top-0 bottom-0 my-auto"
        @click="removeFile"
      >
        <Icon :name="'heroicons-solid:x'" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.profile-avatar{
  max-width: 270px;
}

.profile-avatar img {
  max-width: 270px;
  max-height: 270px;
}

.profile-banner {
  max-width: 800px;
}

.profile-banner img {
  max-width: 800px;
  height: 166px;
}
</style>