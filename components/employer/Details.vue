<script setup>
defineProps({
    employer: {
        type: Object,
        required: true,
    },
})

const divItems = [
    {
        heading: "Light Bulb Association",
        text: "I Want Some Customization And Installation",
        description:
            "Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...",
        professional: "Professional",
        icon: "openmoji:flag-england",
        folderIcon: "material-symbols-light:folder-outline",
        clockIcon: "octicon:clock-24",
        heartIcon: "mdi:heart",
        jobIcon: "fa:tag",
        national: "England",
        typeTime: "Type: Per Hour",
        duration: "Duration: 03 Months",
        job: "Job Id: gy3yV2Vm5u",
        save: "Save",
        aButton: "VIEW JOB",
        badge: "default",
    },
    {
        heading: "Point Trend Studio",
        text: "Website Changes In HTML & PHP",
        description:
            "Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...",
        professional: "Professional",
        icon: "openmoji:flag-united-states",
        folderIcon: "material-symbols-light:folder-outline",
        clockIcon: "octicon:clock-24",
        heartIcon: "mdi:heart",
        jobIcon: "fa:tag",
        national: "United States",
        typeTime: "Type: Per Fixed",
        duration: "Duration: 15 Days",
        job: "Job Id: 5aUQgM2ZbW",
        save: "Click to Save",
        aButton: "VIEW JOB",
        badge: "member",
    },
    {
        heading: "Vortex Association",
        text: "Need Amazon MWS Handshaking",
        description:
            "Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...",
        professional: "Professional",
        icon: "openmoji:flag-united-arab-emirates",
        folderIcon: "material-symbols-light:folder-outline",
        clockIcon: "octicon:clock-24",
        heartIcon: "mdi:heart",
        jobIcon: "fa:tag",
        national: "United Emirates",
        typeTime: "Type: Per Hour",
        duration: "Duration: 03 Months",
        job: "Job Id: gy3yV2Vm5u",
        save: "Click to Save",
        aButton: "VIEW JOB",
        badge: "premium",
    },
    {
        heading: "Traprator House",
        text: "Form-Slider Plugin For Wordpress",
        description:
            "Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...",
        professional: "Professional",
        icon: "openmoji:flag-united-arab-emirates",
        folderIcon: "material-symbols-light:folder-outline",
        clockIcon: "octicon:clock-24",
        heartIcon: "mdi:heart",
        jobIcon: "fa:tag",
        national: "United Emirates",
        typeTime: "Type: Per Hour",
        duration: "Duration: 03 Months",
        job: "Job Id: gy3yV2Vm5u",
        save: "Save",
        aButton: "VIEW JOB",
    },
    {
        heading: "Alfredo Bossard",
        text: "Classifieds Posting, Data Entry, Typing",
        description:
            "Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...",
        professional: "Itermediate",
        icon: "openmoji:flag-canada",
        folderIcon: "material-symbols-light:folder-outline",
        clockIcon: "octicon:clock-24",
        heartIcon: "mdi:heart",
        jobIcon: "fa:tag",
        national: "Canada",
        typeTime: "Type: Per Fixed",
        duration: "Duration: 15 Days",
        job: "Job Id: bsf3NAxTMj",
        save: "Save",
        aButton: "VIEW JOB",
    },
    {
        heading: "Web Revolutions",
        text: "Develop A Transportation Company Website",
        description:
            "Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...",
        professional: "Professional",
        icon: "openmoji:flag-united-states",
        folderIcon: "material-symbols-light:folder-outline",
        clockIcon: "octicon:clock-24",
        heartIcon: "mdi:heart",
        jobIcon: "fa:tag",
        national: "United States",
        typeTime: "Type: Per Fixed",
        duration: "Duration: 15 Days",
        job: "Job Id: 5aUQgM2ZbW",
        save: "Click to Save",
        aButton: "VIEW JOB",
    },
    {
        heading: "Alfredo Bossard",
        text: "Designer Finger Change temp to Arabic and install on alloi",
        description:
            "Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...",
        professional: "Professional",
        icon: "openmoji:flag-united-arab-emirates",
        folderIcon: "material-symbols-light:folder-outline",
        clockIcon: "octicon:clock-24",
        heartIcon: "mdi:heart",
        jobIcon: "fa:tag",
        national: "United Emirates",
        typeTime: "Type: Per Hour",
        duration: "Duration: 03 Months",
        job: "Job Id: gy3yV2Vm5u",
        save: "Click to Save",
        aButton: "VIEW JOB",
    },
];

</script>

<template>

    <div class="">
        <div class="bg-[#323232] rounded-md">
            <img class="opacity-40" :src="employer.backgroundImg" alt="">
        </div>

        <div class="flex flex-col md:flex md:flex-row">
            <div class="md:w-1/3">

                <figure class="flex justify-center mt-[-50px]">
                    <img class="border rounded bg-white" :src="employer.creativeImg" alt="">
                </figure>

                <div class="text-center mt-6">
                    <a class="text-black" href="">{{ employer.verifiedTitle }}</a>
                    <h3 class="text-lg text-black">{{ employer.angryTitle }}</h3>

                </div>
            </div>

            <div class="md:w-2/3">
                <div class="p-10">
                    <h3 class="text-xl text-black">
                        {{ employer.titleDescription }}
                    </h3>
                    <p class="text-base my-6">
                        {{ employer.description }}
                    </p>
                    <p class="text-base">
                        {{ employer.secondDescription }}
                    </p>
                </div>
                <JobsCard :heading="item.heading" :text="item.text" :description="item.description"
                    :professional="item.professional" :icon="item.icon" :folderIcon="item.folderIcon"
                    :clockIcon="item.clockIcon" :heartIcon="item.heartIcon" :jobIcon="item.jobIcon"
                    :national="item.national" :typeTime="item.typeTime" :duration="item.duration" :job="item.job"
                    :save="item.save" :aButton="item.aButton" :badge="item.badge" v-for="(item, index) in divItems"
                    :key="index" />
            </div>
        </div>

    </div>
</template>