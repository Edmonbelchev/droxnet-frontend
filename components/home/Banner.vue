<script setup lang="ts">
const banner: any = ref(null);

const tiltBanner = () => {
  const { clientX, clientY }: any = event;
  const { left, top, width, height } = banner.value.getBoundingClientRect();
  const x = (clientX - (left + width / 2)) / 20;
  const y = (clientY - (top + height / 2)) / 20;

  banner.value.style.transition = "transform 0.1s";
  banner.value.style.willChange = "transform";
  banner.value.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
};

const resetBanner = () => {
  // Set smooth transition
  banner.value.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
};

const searchTypes: Ref<Object> = ref([
  { label: "Freelancer", value: "freelancer" },
  { label: "Project", value: "project" },
  { label: "Contest", value: "contest" },
]);

const formFields: Ref<Object> = ref({
  search: "",
  selected: "",
});
</script>

<template>
  <div
    class="flex justify-center items-center relative after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-[rgba(50,50,50,0.40)] after:z-0 px-5 lg:px-32"
  >
    <img
      src="/images/banner/background-image.webp"
      alt="Hire expert freelancers for any job, Online"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <div class="flex items-center gap-8 py-20">
      <figure class="relative z-10 hidden md:block" ref="banner" @mousemove="tiltBanner" @mouseleave="resetBanner">
        <img
          src="/images/banner/float-img-1.webp"
          alt="Hire expert freelancers for any job, Online"
        />
        <img
          src="/images/banner/float-img-2.webp"
          alt="Hire expert freelancers for any job, Online"
          class="absolute top-0 left-0 animate-[floating_7s_ease-in-out_infinite]"
        />
        <img
          src="/images/banner/float-img-3.webp"
          alt="Hire expert freelancers for any job, Online"
          class="absolute top-0 left-0 animate-[floating_12s_ease-in-out_infinite]"
        />
      </figure>

      <div class="flex flex-col gap-4 relative z-20">
        <h1 class="text-white text-3xl md:text-4xl lg:text-5xl">
          <span class="block">Hire expert freelancers</span>
          <span class="font-[600]">for any job, Online</span>
        </h1>

        <p class="text-white text-sm md:text-base lg:text-lg">
          Millions of small businesses use Freelancer to turn their ideas into
          reality.
        </p>

        <FormElementsInputList
          v-model="formFields"
          :selectOptions="searchTypes"
          placeholder="I'm looking for"
          inputClass="p-4 text-lg rounded-l border-r"
          selectClass="bg-white cursor-pointer flex gap-2 items-center justify-between w-full min-w-[255px] p-4 text-lg"
        />
      </div>
    </div>
  </div>
</template>