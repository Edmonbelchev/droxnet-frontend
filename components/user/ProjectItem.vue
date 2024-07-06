<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const projectMainImage = () => {
    // Retrive from string url the first file with image extension
    const image = props.project.files.find((file) => {
        return file.url.endsWith('.png') || file.url.endsWith('.jpg') || file.url.endsWith('.jpeg') || file.url.endsWith('.gif') || file.url.endsWith('.webp')
    })

    return image.url
}
</script>

<template>
  <div class="w-full sm:w-2/4 md:w-1/3 flex flex-col items-center p-2 px-6">
    <img class="rounded-md w-[200px] h-[140px] object-cover" :src="projectMainImage()" alt="Project Image" />

    <div class="p-4">
      <h3 class="text-black text-base text-center">
        {{ project.title }}
      </h3>
      <span class="text-center">
        <a class="text-blue-400" :href="project.url"> {{ project.url }}</a>
      </span>
    </div>
  </div>
</template>