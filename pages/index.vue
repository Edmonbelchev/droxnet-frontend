<script setup lang="ts">
const categories = [
    {
        'image': 'https://droxnet.com/images/categories/img-01.png',
        'title': 'Web Developer',
        'description': 'Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.'
    },
    {
        'image': 'https://droxnet.com/images/categories/img-08.png',
        'title': 'Software Developer',
        'description': 'Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.'
    },
    {
        'image': 'https://droxnet.com/images/categories/img-02.png',
        'title': 'Mobile Apps',
        'description': 'Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.'
    },
    {
        'image': 'https://droxnet.com/images/categories/img-03.png',
        'title': 'Data Entry',
        'description': 'Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.'
    },
    {
        'image': 'https://droxnet.com/images/categories/img-04.png',
        'title': 'Design',
        'description': 'Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.'
    },
    {
        'image': 'https://droxnet.com/images/categories/img-05.png',
        'title': 'Seo',
        'description': 'Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.'
    },
    {
        'image': 'https://droxnet.com/images/categories/img-06.png',
        'title': 'Marketing',
        'description': 'Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.'
    },
    {
        'image': 'https://droxnet.com/images/categories/img-07.png',
        'title': 'Copywriter',
        'description': 'Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.'
    },
]
</script>


<template>
    <header class="relative z-10">
        <Navbar />
    </header>

    <main>
        <div class="relative z-0">
            <HomeBanner />
        </div>
        <!-- grid grid-cols-4 -->
      <div class="py-20">
        <div class="flex flex-col items-center mb-20">
            <h2 class="text-4xl text-gray-800 font-bold">Explore Categories</h2>
            <span class="text-lg">Professional by categories</span>
          </div>
        <div class="w-8/12 mx-auto flex justify-center flex-wrap">
            <CategoryItem 
            :image="category.image"
            :title="category.title" 
            :description="category.description"
            v-for="(category, index) in categories"
            :key="index"
          />
        </div>
      </div>
        <Footer />
    </main>
</template>