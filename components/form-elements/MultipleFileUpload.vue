<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Array as () => File[],
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  className: {
    type: String,
    default: "profile-avatar",
  },
});

const emit = defineEmits(["update:modelValue"]);

const fileErrorMessage: any = ref("");

const uploadedFiles: Ref<File[]> = ref(props.modelValue ?? []);
const fileDraggedOver = ref(false);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files) {
    const newFiles = Array.from(files);

    // Validate files
    const allowedExtensions = [
      "png",
      "jpg",
      "jpeg",
      "webp",
      "pdf",
      "txt",
      "docx",
    ];
    const maxSizeInBytes = 10000; // 10MB

    const validFiles = newFiles.filter((file) => {
      const validExtension = allowedExtensions.some((ext) =>
        file.name.toLowerCase().endsWith(`.${ext}`)
      );

      if (!validExtension) {
        fileErrorMessage.value =
          "Invalid file extension. Only PNG, JPG, JPEG, WEBP, PDF, DOCX, DOC and TXT files are allowed.";
        return false;
      } else if (file.size > maxSizeInBytes * 1024) {
        fileErrorMessage.value = "File size exceeds the limit of 10MB.";
        return false;
      } else {
        return true;
      }
    });

    if (validFiles.length !== newFiles.length) {
      return;
    } else {
      fileErrorMessage.value = "";
    }

    // Update files
    uploadedFiles.value = [...uploadedFiles.value, ...validFiles];

    emit("update:modelValue", uploadedFiles.value);

    // Update previews
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    });

    fileDraggedOver.value = false;
  }
};

const handleDragOver = (event: Event) => {
  event.preventDefault();
  fileDraggedOver.value = true;
};

const handleDragLeave = (event: Event) => {
  event.preventDefault();
  fileDraggedOver.value = false;
};

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1);

  emit("update:modelValue", uploadedFiles.value);
};

const formatFileSize = (sizeInBytes: number): string => {
  return (sizeInBytes / 1024).toFixed(2);
};
</script>

<template>
  <label
    :for="id"
    class="border-dashed border-2 p-4 flex flex-col gap-2 md:flex-row md:gap-8 items-center relative text-xs md:text-sm"
    :class="fileDraggedOver ? 'border-[--primary-color]' : 'border-gray-200'"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
  >
    <input
      type="file"
      :name="name"
      :id="id"
      class="absolute w-full h-full inset-0 opacity-0 cursor-copy"
      accept=".png,.jpg,.jpeg,.webp,.pdf,.txt,.docx,.doc"
      @change="handleFileChange"
      multiple
    />

    <span class="bg-[--green-color] text-white px-8 py-3 rounded-md uppercase"
      >Select files</span
    >
    Drop files here to upload
  </label>

  <p
    class="mt-2 text-sm text-red-400 block animate-fade"
    v-html="fileErrorMessage"
    v-if="fileErrorMessage"
  ></p>

  <div v-if="uploadedFiles.length" :class="`${className} w-full mt-4`">
    <div
      class="flex flex-row justify-between gap-2 p-2 pr-8 sm:p-4 sm:pr-10 relative border-x border-t"
      :class="{ 'border-b': index === uploadedFiles.length - 1 }"
      v-for="(file, index) in uploadedFiles"
      :key="index"
    >
      <div v-if="file" class="flex flex-wrap gap-2 w-full">
        <span
          class="text-xs text-[--text-color] truncate"
          v-if="!file.name && !file.size"
          v-html="file"
        ></span>

        <span
          class="text-xs text-[--text-color]"
          v-if="file.name"
          v-html="file.name"
        ></span>

        <span
          class="text-xs italic font-light text-gray-400 min-w-[100px]"
          v-if="file.size"
          >File size: {{ formatFileSize(file.size) }} KB</span
        >
      </div>

      <div class="flex items-center gap-1 text-xs" v-else>
        <!-- Add error icon -->
        <Icon name="bx:bxs-error" class="text-red-400" />
        Error
      </div>

      <button
        type="button"
        class="text-red-400 text-sm underline absolute right-3 -top-1 bottom-0 my-auto"
        @click="removeFile(index)"
      >
        <Icon :name="'heroicons-solid:x'" />
      </button>
    </div>
  </div>
</template>
  