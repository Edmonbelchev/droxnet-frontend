<script setup>
defineProps({
  information: {
    type: Array,
    required: true,
  },
  className: {
    type: String,
  },
});
</script>

<template>
  <div class="lg:flex lg:justify-center" :class="className">
    <div class="lg:w-3/5">
      <h2 class="text-4xl text-gray-800 font-bold mb-3 ">
        {{ information.title }}
      </h2>
      <h3 class="text-lg mb-6">{{ information.subTitle }}</h3>
      <span class="border-b-4 w-[160px] border-[--primary-color] rounded-md absolute"></span>
      <p class="pt-14 mb-6 lg:text-base md:text-2xl">
        {{ information.description }}
        <a class="text-blue-400" :href="information.learn">{{
          information.learn
        }}</a>
      </p>
      <QuestionToggler
        :hiddenContent="hiddenContent"
        :questions="information.questions"
      />
    </div>

    <div class="lg:w-2/5 md:hidden lg:block">
      <img :src="information.img" alt="Information Image" />
    </div>
  </div>
</template>