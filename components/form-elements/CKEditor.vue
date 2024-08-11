<script setup lang="ts">
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import type { EditorConfig } from "@ckeditor/ckeditor5-core";

const emit = defineEmits(["update:modelValue"]);

const isLayoutReady = ref(false);
const editor = ClassicEditor;
const editorData = ref();

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
  <ckeditor
    v-if="isLayoutReady"
    v-model="editorData"
    :editor="editor"
    :config="editorConfig"
  />
</template>

<style>
.ck.ck-content {
  min-height: 200px;
}

.ck.ck-content h3.category {
  font-size: 20px;
  font-weight: bold;
  color: #555;
  letter-spacing: 10px;
  margin: 0;
  padding: 0;
}

.ck.ck-content h2 {
  font-size: 30px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  border: 0;
}

.ck.ck-content h3 {
  font-size: 20px;
  color: #555;
  margin: 0 0 1em;
  font-weight: bold;
  padding: 0;
}

.ck.ck-content h4 {
  font-size: 18px;
  color: #555;
  margin: 0 0 1em;
  font-weight: bold;
  padding: 0;
}

.ck.ck-content blockquote.side-quote {
  font-style: normal;
  float: right;
  width: 35%;
  position: relative;
  border: 0;
  overflow: visible;
  z-index: 1;
  margin-left: 1em;
}

.ck.ck-content blockquote.side-quote::before {
  content: "“";
  position: absolute;
  top: -37px;
  left: -10px;
  display: block;
  font-size: 200px;
  color: #e7e7e7;
  z-index: -1;
  line-height: 1;
}

.ck.ck-content blockquote.side-quote p {
  font-size: 2em;
  line-height: 1;
}

.ck.ck-content blockquote.side-quote p:last-child:not(:first-child) {
  font-size: 1.3em;
  text-align: right;
  color: #555;
}

.ck.ck-content ul,
.ck.ck-content ol {
  padding-left: 20px;
}

.ck.ck-content ul {
  list-style-type: none;
}

.ck.ck-content ul li {
  position: relative;
  display: flex;
  align-items: center;
}

.ck.ck-content ul li:before {
  content: "";
  margin-right: 5px;
  width: 20px;
  height: 10px;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1280'%3E%3Cpath fill='%23000' d='M1575 310q0 40-28 68l-724 724l-136 136q-28 28-68 28t-68-28l-136-136L53 740q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295l656-657q28-28 68-28t68 28l136 136q28 28 28 68'/%3E%3C/svg%3E");
  background-color: var(--green-color);
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
</style>
  
  