<script setup>
const props = defineProps({
  award: {
    type: Object,
    required: true,
  },
  className: {
    type: String,
    default: "flex mb-[30px]"
  }
});

const awardMainImage = () => {
    // Retrive from string url the first file with image extension
    const image = props.award.files.find((file) => {
        return file.url.endsWith('.png') || file.url.endsWith('.jpg') || file.url.endsWith('.jpeg') || file.url.endsWith('.gif') || file.url.endsWith('.webp')
    })

    return image.url
}
</script>

<template>
  <div :class="className">
    <img
      class="rounded-md w-[50px] h-[50px]"
      :src="awardMainImage()"
      alt="Award Image"
    />
    <div class="px-2">
      <h3 class="p text-black">
        {{ award.title }}
      </h3>
      <span class="text-inherit">
        {{ award.date }}
      </span>
    </div>
  </div>
</template>