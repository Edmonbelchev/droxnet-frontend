<template>
    <div class="container mx-auto mt-5">
      <ul class="list-disc list-none pl-0">
        <li v-for="(item, index) in items" :key="index" class="py-1 hover:translate-x-3 duration-500">
          <a :href="'#' + item.id":class="{ 'text-blue-400':
           index === items.length - 1,
            'text-base':true,
        }">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['items']
  };
  </script>
  