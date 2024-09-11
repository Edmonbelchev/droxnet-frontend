<script setup lang="ts">
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { EditorConfig } from "@ckeditor/ckeditor5-core";

const props = defineProps({
  errorMessages: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: "",
  }
});

const emit = defineEmits(["update:modelValue"]);

const isLayoutReady = ref(false);
const editor = ClassicEditor;
const editorData = ref(props.modelValue ?? "");

const editorConfig: EditorConfig = {
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "|",
      "indent",
      "outdent",
    ],
  },
  language: "en",
};

watch(editorData, (value) => {
  emit("update:modelValue", value);
});

onMounted(() => {
  isLayoutReady.value = true;
});
</script>

<template>
  <div :class="{'ckeditor-error' : errorMessages.length > 0}">
    <ckeditor
      v-if="isLayoutReady"
      v-model="editorData"
      :editor="editor"
      :config="editorConfig"
    />
    <span
      class="text-red-500 text-xs"
      v-for="(error, index) in errorMessages"
      :key="index"
    >
      {{ error.$message }}
    </span>
  </div>
</template>
  
  