<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const categories = [
    {
        image: "images/categories/img-01.webp",
        title: "Web Developer",
        description:
            "Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.",
        route: "/",
    },
    {
        image: "images/categories/img-08.webp",
        title: "Software Developer",
        description:
            "Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.",
        route: "/",
    },
    {
        image: "images/categories/img-02.webp",
        title: "Mobile Apps",
        description:
            "Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.",
        route: "/",
    },
    {
        image: "images/categories/img-03.webp",
        title: "Data Entry",
        description:
            "Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.",
        route: "/",
    },
    {
        image: "images/categories/img-04.webp",
        title: "Design",
        description:
            "Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.",
        route: "/",
    },
    {
        image: "images/categories/img-05.webp",
        title: "Seo",
        description:
            "Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.",
        route: "/",
    },
    {
        image: "images/categories/img-06.webp",
        title: "Marketing",
        description:
            "Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.",
        route: "/",
    },
    {
        image: "images/categories/img-07.webp",
        title: "Copywriter",
        description:
            "Consectetur adipisicing elitaed eiusmod tempor incididuatna labore et dolore magna.",
        route: "/",
    },
];  

</script>

<template>
    <NuxtLayout name="default">
        <main>
            <div class="relative z-0">
                <HomeBanner />
            </div>

            <!-- grid grid-cols-4 -->
            <div class="py-10 px-4 md:px-8 xl:py-20 xl:px-10 flex flex-col justify-center items-center">
                <div class="flex flex-col gap-2 mb-14 lg:mb-20 text-center">
                    <h2 class="text-3xl xl:text-4xl text-gray-800 font-bold">Explore Categories</h2>
                    <span
                        class="text-md lg:text-lg relative after:content-[''] after:absolute after:-bottom-4 after:left-0 after:right-0 after:mx-auto after:w-40 after:h-1 after:bg-[--primary-color] after:rounded-lg">Professional
                        by categories</span>
                </div>

                <div class="w-full max-w-[1140px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-8 lg:mb-12">
                    <CategoryItem 
                        :image="category.image" 
                        :title="category.title" 
                        :description="category.description"
                        :route="category.route" v-for="(category, index) in categories" :key="index" 
                    />
                </div>

                <NuxtLink to="/" class="primary-button">View All Categories</NuxtLink>
            </div>

            <HomeCta />
            <HomeSearchByElement />
        </main>
    </NuxtLayout>
</template>