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
    <div class="flex justify-center py-16 max-w-6xl">
      <div class="px-4 w-3/4">
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

      <div class="w-1/3 pl-12 border-l border-white/20">
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

      <div class="w-1/3 px-4">
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

    <div class="py-7 bg-[#282828] w-full">
      <div class="flex justify-center gap-40 items-center">
        <div>
          <span class="text-white">
            <a class="text-2xl font-extrabold text-blue-400" href="#"
              >New @ Droxnet?</a
            >
            Dotem eiusmod tempor incune utnaem labore etdolore.
          </span>
        </div>

        <div
          class="hover:shadow-xl duration-300 text-white px-10 py-3 bg-red-500 rounded"
        >
          <a href="#">Join Now</a>
        </div>
      </div>
    </div>

    <div class="py-5 w-full">
      <div class="flex justify-center justify-evenly gap-40">
        <p class="text-gray-300">
          <span class="text-blue-400">Droxnet.</span>
          @ 2022 All Rights Reserved.
        </p>

        <nav>
          <ul class="flex gap-4 text-sm">
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