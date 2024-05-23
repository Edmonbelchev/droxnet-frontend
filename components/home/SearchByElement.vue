<script setup lang="ts">
const skillsItems = [
  { id: 1, name: "Software Engineer" },
  { id: 2, name: "Technical Writer" },
  { id: 3, name: "UL Designer" },
  { id: 4, name: "UX Designer" },
  { id: 5, name: "Virtual Assistant" },
  { id: 6, name: "Web Designer" },
  { id: 7, name: "Wordpress Developer" },
  { id: 8, name: "Content Writer" },
  { id: 9, name: "+ View All" },
];

const usSkillsItems = [
  { id: 1, name: "HTML Developers in US" },
  { id: 2, name: "HTML5 Developers in US" },
  { id: 3, name: "JavaScript Developers in US" },
  { id: 4, name: "Microsoft Word Experts in US" },
  { id: 5, name: "PowerPoint Experts in US" },
  { id: 6, name: "Social Media Marketers in US" },
  { id: 7, name: "WordPress Developers in US" },
  { id: 8, name: "Writers in US" },
  { id: 9, name: "+ View All" },
];

const categoriesItems = [
  { id: 1, name: "Graphics & Design" },
  { id: 2, name: "Digital Marketing" },
  { id: 3, name: "Writing & Translation" },
  { id: 4, name: "Video & Animation" },
  { id: 5, name: "Music & Audio" },
  { id: 6, name: "Programming & Tech" },
  { id: 7, name: "Business" },
  { id: 8, name: "Fun & Lifestyle" },
  { id: 9, name: "+ View All" },
];

const locationItems = [
  { id: 1, name: "Switzerland" },
  { id: 2, name: "Canada" },
  { id: 3, name: "Germany" },
  { id: 4, name: "United Kingdom" },
  { id: 5, name: "Japan" },
  { id: 6, name: "Sweden" },
  { id: 7, name: "Australia" },
  { id: 8, name: "United States" },
  { id: 9, name: "+ View All" },
];
</script>

<template>
  <div class="bg-[#f7f7f7]">
    <div class="mx-auto max-w-screen-xl px-4 py-8 md:p-10 xl:p-12">
      <div class="flex flex-wrap md:justify-center">
        <div class="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0 sm:px-10 md:px-10 lg:px-0">
          <h2 class="text-lg text-gray-800 font-medium mb-2 lg:mb-4">By Skills</h2>
          <ListWithAnchors :items="skillsItems" />
        </div>
        <div class="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0 sm:px-10 md:px-10 lg:px-0">
          <h2 class="text-lg text-gray-800 font-medium mb-2 lg:mb-4">Skills In US</h2>
          <ListWithAnchors :items="usSkillsItems" />
        </div>
        <div class="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0 sm:px-10 md:px-10 lg:px-0">
          <h2 class="text-lg text-gray-800 font-medium mb-2 lg:mb-4">By Categories</h2>
          <ListWithAnchors :items="categoriesItems" />
        </div>
        <div class="w-full sm:w-1/2 lg:w-1/4 lg:mb-0 sm:px-10 md:px-10 lg:px-0">
          <h2 class="text-lg text-gray-800 font-medium mb-2 lg:mb-4">By Location</h2>
          <ListWithAnchors :items="locationItems" />
        </div>
      </div>
    </div>
  </div>
</template>
