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
    <div class="mx-auto max-w-screen-xl p-12">
      <div class="flex justify-center">
        <div class="w-1/4">
          <h2 class="text-xl text-gray-800 font-medium">By Skills</h2>
          <ListWithAnchors :items="skillsItems" />
        </div>
        <div class="w-1/4">
          <h2 class="text-xl text-gray-800 font-medium">Skills In US</h2>
          <ListWithAnchors :items="usSkillsItems" />
        </div>
        <div class="w-1/4">
          <h2 class="text-xl text-gray-800 font-medium">By Categories</h2>
          <ListWithAnchors :items="categoriesItems" />
        </div>
        <div class="w-1/4">
          <h2 class="text-xl text-gray-800 font-medium">By Location</h2>
          <ListWithAnchors :items="locationItems" />
        </div>
      </div>
    </div>
  </div>
</template>
