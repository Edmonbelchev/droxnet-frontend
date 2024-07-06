<script setup>
const props = defineProps({
  skill: {
    type: Object,
    required: true,
  },
  className: {
    type: String,
    default: "flex flex-col gap-1 mb-[20px]",
  },
});

const isVisible = ref(false);
const skillBarRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (skillBarRef.value) {
    observer.observe(skillBarRef.value);
  }
});
</script>

<template>
  <div :class="className" ref="skillBarRef">
    <div class="flex justify-between gap-1">
      <span class="text-[#7d7d7d]">{{ skill.name }}</span>
      <span class="text-[#7d7d7d]">{{ skill.rate }}%</span>
    </div>
    <div
      class="relative bg-[--background-color] w-full h-[5px] rounded-md overflow-hidden"
    >
      <div
        class="absolute left-0 bg-[--green-color] h-full rounded-md transition-all duration-1000 ease-out"
        :class="{ 'w-0': !isVisible }"
        :style="{ width: isVisible ? `${skill.rate}%` : '0%' }"
      >
        <div
          class="absolute top-0 left-0 right-0 h-full w-full rounded-md opacity-10 animate-[move_2s_linear_infinite]"
          :style="{
            backgroundImage: 'url(/images/img-skills.webp)',
            backgroundRepeat: 'repeat',
            backgroundSize: 'cover',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>