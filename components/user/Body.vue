<script setup>
const projects = [
    {
        image: "http://amentotech.com/htmls/worktern/images/projects/img-01.jpg",
        title: "Themeforest",
        information: "www.themeforest.net"
    },
    {
        image: "http://amentotech.com/htmls/worktern/images/projects/img-02.jpg",
        title: "Videohive",
        information: "www.videohive.net"
    },
    {
        image: "http://amentotech.com/htmls/worktern/images/projects/img-03.jpg",
        title: "Codecanyon",
        information: "www.codecanyon.net"
    },
    {
        image: "http://amentotech.com/htmls/worktern/images/projects/img-04.jpg",
        title: "Graphicriver",
        information: "www.graphicriver.net"
    },
    {
        image: "http://amentotech.com/htmls/worktern/images/projects/img-05.jpg",
        title: "Photodune",
        information: "www.photodune.net"
    },
    {
        image: "http://amentotech.com/htmls/worktern/images/projects/img-06.jpg",
        title: "Audiojungle",
        information: "www.audiojungle.net"
    },
];


const awards = [
    {
        image: "http://amentotech.com/htmls/worktern/images/thumbnail/img-07.jpg",
        title: "Top PHP Excel Skills",
        date: "Jun 27, 2018"
    },
    {
        image: "http://amentotech.com/htmls/worktern/images/thumbnail/img-08.jpg",
        title: "Monster Developer Award",
        date: "Apr 27, 2018"
    },
    {
        image: "http://amentotech.com/htmls/worktern/images/thumbnail/img-09.jpg",
        title: "Best Communication 2015",
        date: "May 27, 2018"
    },
    {
        image: "http://amentotech.com/htmls/worktern/images/thumbnail/img-10.jpg",
        title: "Best Logo Design Winner",
        date: "Aug 27, 2018"
    },

];

const experiences = [
    {
        job_title: "Web & Apps Project Manager",
        company_name: "Amento Tech",
        start_date: "Aug 2017",
        end_date: "Jul 2018",
        description: '“ Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquaenim ad minim veniamac quis nostrud exercitation ullamco laboris. ”'
    },
    {
        job_title: "Sr. PHP & Laravel Developer",
        company_name: "Amento Tech",
        start_date: "Jun 2017",
        end_date: "Jul 2018",
        description: '“ Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquaenim ad minim veniamac quis nostrud exercitation ullamco laboris. ”'
    },
    {
        job_title: "PHP Developer",
        company_name: "Amento Tech",
        start_date: "Apr 2016",
        end_date: "Jul 2017",
        description: '“ Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquaenim ad minim veniamac quis nostrud exercitation ullamco laboris. ”'
    },
];
const educations = [
    {
        job_title: "Web & Apps Project Manager",
        company_name: "Amento Tech",
        start_date: "Aug 2017",
        end_date: "Jul 2018",
        description: '“ Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquaenim ad minim veniamac quis nostrud exercitation ullamco laboris. ”'

    },
    {
        job_title: "Sr. PHP & Laravel Developer",
        company_name: "Amento Tech",
        start_date: "Jun 2017",
        end_date: "Jul 2018",
        description: '“ Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquaenim ad minim veniamac quis nostrud exercitation ullamco laboris. ”'

    },
    {
        job_title: "PHP Developer",
        company_name: "Amento Tech",
        start_date: "Apr 2016",
        end_date: "Jul 2017",
        description: '“ Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquaenim ad minim veniamac quis nostrud exercitation ullamco laboris. ”'

    },
];
</script>



<template>
    <div class="flex flex-col lg:flex-row gap-10 max-w-[1140px] w-full mx-auto">

        <div class="max-w-[580px] lg:max-w-[730px] mx-auto">
            <div class="px-10 py-4">
                <h3 class="text-xl text-black">
                    Crafted Projects
                </h3>
            </div>
            <div class="flex flex-wrap text-center">
                <UserProjectItem :project="project" v-for="(project, index) in projects" :key="index" />
            </div>
            <div>
                <div>
                    <h3 class="px-10 py-8 text-xl text-black">
                        Experience
                    </h3>
                </div>
                <UserExperienceItem :experience="experience" v-for="(experience, index) in experiences" :key="index" />

            </div>

            <div>
                <div>
                    <h3 class="px-10 py-8 text-xl text-black">
                        Education
                    </h3>
                </div>
                <UserEducationItem :education="education" v-for="(education, index) in educations" :key="index" />

            </div>

        </div>


        <div class="p-[30px] max-w-[580px]  lg:max-w-[350px] mx-auto w-full">
            <div>
                <UserAwardItem :award="award" v-for="(award, index) in awards" :key="index" />
            </div>

        </div>

        
      
    </div>

</template>