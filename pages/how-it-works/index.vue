<!-- index.vue -->
<template>
    <NuxtLayout name="default">
        <InformationCard :informations="informations" />

    </NuxtLayout>
</template>

<script>
export default {
    data() {
        return {
            informations: [
                {
                    divTitleOne: "How To Start Hiring",
                    divTitleTwo: "Getting Into Business",
                    divTitleThre: "Making Serious Profit",

                    underTitleOne: "Start Today For a Great Future",
                    underTitleTwo: "Focus on Your Work & Team",
                    underTitleThre: "Manage Your Profitable Account",

                    description:
                        "Dotem eiusmod tempor incune utnaem labore etdolore maigna aliqua eniina ilukita ylokem lokateise ination voluptate velite esse cillum dolore eu fugnulla pariatur lokaim urianewce animid ",
                    learn: "Learn more",

                    img: "https://amentotech.com/htmls/worktern/images/work/img-01.jpg",
                    imgTwo: "https://amentotech.com/htmls/worktern/images/work/img-02.jpg",
                    imgThre: "https://amentotech.com/htmls/worktern/images/work/img-03.jpg"
                }
            ],
        };
    }
};
</script>
