<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

defineProps({
  questions: {
    type: Array,
    required: true,
  },
});

const showContent = ref(null);
const toggleContent = (index) => {
  showContent.value = showContent.value === index ? null : index;
};
</script>

<template>
  <div>
    <ul>
      <li
        v-for="(content, index) in questions"
        :key="index"
        @click="toggleContent(index)"
      >
        <h2 class="border border-gray p-4 text-black cursor-pointer lg:text-base md:text-base">
          {{ content.title }}
        </h2>
        <div
          class="overflow-hidden transition-all duration-300 lg:mb-0 md:mb-5"
          :class="{
            block: showContent === index,
            'max-h-[200px]': showContent === index,
            'max-h-0': showContent !== index,
          }"
          @click.stop
        >
          <div class="lg:p-6 md:px-5 md:py-3 bg-[--background-color]">
            <h2 class="text-lg text-black mb-2">{{ content.contentTitle }}</h2>
            <p class="mb-4 font-normal lg:text-sm md:text-lg">{{ content.description }}</p>

            <div class="flex items-center gap-3">
              <span class="text-black lg:text-xs md:text-lg">{{ content.questions }}</span>
              <div class="flex items-center">
                <span class="border-black border-r-[1px] pr-2 py-1">
                  <Icon icon="fa-solid:thumbs-up" class="text-green-500" />
                </span>
                <span class="pl-2 py-1">
                  <Icon icon="fa:thumbs-down" class="text-red-500" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.content {
  overflow: hidden;
  transition: height 0.3s ease-in-out;
}
</style>













<!-- <ul>
        <li class="border" @click="show = !show">Adipisicing elit, sed do eiusmod tempor incididunt?
            <div :style="{ height: show ? '200px' : '0' }" class="content" :class="{ 'block': show }">
                <h2>Digital Marketing</h2>
                <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore eta dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>
                <div>
                    <span>Did you find this useful?</span>
                </div>
            </div>
        </li>
        <li class="border" @click="secondShow = !secondShow">Dolore magna aliqua enim ad minim veniam?
            <div :style="{ height: secondShow ? '200px' : '0' }" class="content" :class="{ 'block': secondShow }">
                <h2>Digital Marketing</h2>
                <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore eta dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>
                <div>
                    <span>Did you find this useful?</span>
                </div>
            </div>
        </li>
        <li class="border" @click="thirdShow = !thirdShow">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo?
            <div :style="{ height: thirdShow ? '200px' : '0' }" class="content" :class="{ 'block': thirdShow }">
                <h2>Digital Marketing</h2>
                <p>Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore eta dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>
                <div>
                    <span>Did you find this useful?</span>
                </div>
            </div>
        </li>
    </ul> -->