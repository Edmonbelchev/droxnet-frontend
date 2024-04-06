<script setup lang="ts">
const socialMediaIcons = [
  { name: "facebook-f", link: "https://facebook.com" },
  { name: "twitter", link: "https://twitter.com" },
  { name: "youtube", link: "https://youtube.com" },
  { name: "instagram", link: "https://instagram.com" },
  { name: "google-plus-g", link: "https://google.com" },
];
</script>

<template>
  <footer class="bg-[#323232] flex flex-col items-center">
    <div class="flex flex-col justify-center gap-8 px-4 py-16 max-w-[960px] md:flex-row xl:gap-10">
      <div class="md:w-1/2">
        <div class="mb-8 w-fit">
          <Logo />
        </div>

        <p class="leading-7 text-gray-300 mb-4">
          Dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua enim
          poskina ilukita ylokem lokateise ination voluptate velit esse cillum
          dolore eu fugiat nulla pariatur lokaim urianewce
          <a class="text-blue-400" href="#">more...</a>
        </p>

        <div class="flex gap-4">
          <a
            class="text-white text-xl hover:text-[--primary-color] transition-all"
            :href="icon.link"
            v-for="(icon, index) in socialMediaIcons"
            :key="index"
          >
            <font-awesome :icon="['fa-brands', icon.name]" />
          </a>
        </div>
      </div>

      <div class="border-t border-white/20 flex gap-6 pt-8 md:pl-10 md:border-l md:border-t-0 md:w-1/2 md:pt-0 xl:pl-16">
        <div class="w-1/2">
          <h3 class="text-white text-xl mb-3">Company</h3>
  
          <ul class="flex flex-col gap-1">
            <li
              class="text-sm py-0.5 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a href="#">About Us</a>
            </li>
            <li
              class="text-sm py-1 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a href="#">How it Works</a>
            </li>
            <li
              class="text-sm py-1 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a href="#">Careers</a>
            </li>
            <li
              class="text-sm py-1 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a href="#">Terms & Conditions</a>
            </li>
            <li
              class="text-sm py-1 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a href="#">Trust & Safety</a>
            </li>
            <li
              class="text-sm py-1 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a class="text-blue-400" href="#">+ View All</a>
            </li>
          </ul>
        </div>
  
        <div class="w-1/2">
          <h3 class="text-white text-xl mb-3">Explore More</h3>
  
          <ul class="flex flex-col gap-1">
            <li
              class="text-sm py-1 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a href="#">Freelancers in USA</a>
            </li>
            <li
              class="text-sm py-1 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a href="#">Freelancers in Canada</a>
            </li>
            <li
              class="text-sm py-1 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a href="#">Freelancers in Australia</a>
            </li>
            <li
              class="text-sm py-1 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a href="#">Jobs in USA</a>
            </li>
            <li
              class="text-sm py-1 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a href="#">Find jobs</a>
            </li>
            <li
              class="text-sm py-1 text-gray-300 hover:translate-x-2 transition duration-300"
            >
              <a class="text-blue-400" href="#">+ View All</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="px-4 py-7 bg-[#282828] w-full flex justify-center">
      <div class="flex justify-center flex-col sm:flex-row gap-y-4 gap-x-20 items-center max-w-[960px]">
        <span class="text-white flex-1">
          <a class="text-2xl font-extrabold text-blue-400" href="#">New @ Droxnet?</a
          >
          Dotem eiusmod tempor incune utnaem labore etdolore.
        </span>

        <a href="#" class="primary-button">Join Now</a>
      </div>
    </div>

    <div class="py-5 px-4 w-full">
      <div class="flex items-center justify-center flex-wrap gap-y-4 gap-x-10 xl:gap-x-40">
        <p class="text-gray-300 flex-1 text-center">
          <span class="text-blue-400">Droxnet.</span>
          @ 2022 All Rights Reserved.
        </p>

        <nav class="w-full">
          <ul class="flex justify-center flex-wrap gap-4 text-sm">
            <li class="text-gray-300 hover:text-blue-400 duration-300">
              <a href="#">News</a>
            </li>
            <li class="text-gray-300 hover:text-blue-400 duration-300">
              <a href="#">Terms & Conditions</a>
            </li>
            <li class="text-gray-300 hover:text-blue-400 duration-300">
              <a href="#">Privacy Policy</a>
            </li>
            <li class="text-gray-300 hover:text-blue-400 duration-300">
              <a href="#">Career</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>