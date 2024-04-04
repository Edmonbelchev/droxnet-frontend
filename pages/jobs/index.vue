<script setup>
// icon: 'openmoji:flag-england',

const divItems = [
    {
        heading: 'Light Bulb Association',
        text: 'I Want Some Customization And Installation',
        'description': 'Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...',
        professional: 'Professional',
        icon: 'openmoji:flag-england',
        folderIcon: 'material-symbols-light:folder-outline',
        clockIcon: 'octicon:clock-24',
        heartIcon: 'mdi:heart',
        jobIcon: 'fa:tag',
        national: 'England',
        typeTime: 'Type: Per Hour',
        duration: 'Duration: 03 Months',
        job: 'Job Id: gy3yV2Vm5u',
        save: 'Save',
        aButton: 'VIEW JOB'
    },
    {
        heading: 'Point Trend Studio',
        text: 'Website Changes In HTML & PHP',
        'description': 'Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...',
        professional: 'Professional',
        icon: 'openmoji:flag-united-states',
        folderIcon: 'material-symbols-light:folder-outline',
        clockIcon: 'octicon:clock-24',
        heartIcon: 'mdi:heart',
        jobIcon: 'fa:tag',
        national: 'United States',
        typeTime: 'Type: Per Fixed',
        duration: 'Duration: 15 Days',
        job: 'Job Id: 5aUQgM2ZbW',
        save: 'Click to Save',
        aButton: 'VIEW JOB'
    },
    {
        heading: 'Vortex Association',
        text: 'Need Amazon MWS Handshaking',
        'description': 'Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...',
        professional: 'Professional',
        icon: 'openmoji:flag-united-arab-emirates',
        folderIcon: 'material-symbols-light:folder-outline',
        clockIcon: 'octicon:clock-24',
        heartIcon: 'mdi:heart',
        jobIcon: 'fa:tag',
        national: 'United Emirates',
        typeTime: 'Type: Per Hour',
        duration: 'Duration: 03 Months',
        job: 'Job Id: gy3yV2Vm5u',
        save: 'Click to Save',
        aButton: 'VIEW JOB'
    },
    {
        heading: 'Traprator House',
        text: 'Form-Slider Plugin For Wordpress',
        'description': 'Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...',
        professional: 'Professional',
        icon: 'openmoji:flag-united-arab-emirates',
        folderIcon: 'material-symbols-light:folder-outline',
        clockIcon: 'octicon:clock-24',
        heartIcon: 'mdi:heart',
        jobIcon: 'fa:tag',
        national: 'United Emirates',
        typeTime: 'Type: Per Hour',
        duration: 'Duration: 03 Months',
        job: 'Job Id: gy3yV2Vm5u',
        save: 'Save',
        aButton: 'VIEW JOB'
    },
    {
        heading: 'Alfredo Bossard',
        text: 'Classifieds Posting, Data Entry, Typing',
        'description': 'Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...',
        professional: 'Itermediate',
        icon: 'openmoji:flag-canada',
        folderIcon: 'material-symbols-light:folder-outline',
        clockIcon: 'octicon:clock-24',
        heartIcon: 'mdi:heart',
        jobIcon: 'fa:tag',
        national: 'Canada',
        typeTime: 'Type: Per Fixed',
        duration: 'Duration: 15 Days',
        job: 'Job Id: bsf3NAxTMj',
        save: 'Save',
        aButton: 'VIEW JOB'
    },
    {
        heading: 'Web Revolutions',
        text: 'Develop A Transportation Company Website',
        'description': 'Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...',
        professional: 'Professional',
        icon: 'openmoji:flag-united-states',
        folderIcon: 'material-symbols-light:folder-outline',
        clockIcon: 'octicon:clock-24',
        heartIcon: 'mdi:heart',
        jobIcon: 'fa:tag',
        national: 'United States',
        typeTime: 'Type: Per Fixed',
        duration: 'Duration: 15 Days',
        job: 'Job Id: 5aUQgM2ZbW',
        save: 'Click to Save',
        aButton: 'VIEW JOB'
    },
    {
        heading: 'Alfredo Bossard',
        text: 'Designer Finger Change temp to Arabic and install on alloi',
        'description': 'Nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit inati voluptate velit esse cillum dolore eutates fugiat nulla pariatur sunt in culpa asequi officia deserunt mollit anim id est laborum ut perspiciatis...',
        professional: 'Professional',
        icon: 'openmoji:flag-united-arab-emirates',
        folderIcon: 'material-symbols-light:folder-outline',
        clockIcon: 'octicon:clock-24',
        heartIcon: 'mdi:heart',
        jobIcon: 'fa:tag',
        national: 'United Emirates',
        typeTime: 'Type: Per Hour',
        duration: 'Duration: 03 Months',
        job: 'Job Id: gy3yV2Vm5u',
        save: 'Click to Save',
        aButton: 'VIEW JOB'
    },

]

</script>

<template>
    <NuxtLayout name="default">
        <div class="flex justify-center">
            <div class="w-4/6 flex">
                <div class="w-2/6">

                </div>
                <div class="w-4/6">

                    <div v-for="(item, index) in divItems" :key="index"
                        class="overflow-hidden rounded-md mb-10 bg-white rounded-lg transition-shadow duration-500 flex primary-section duration-500">
                        <div class="w-4/6 py-10 px-10 relative">
                         
                            <span :class="{
                                'section-one': index === 0,
                                'section-two': index === 1,
                                'section-thre': index === 2
                            }">
                            <img src="https://amentotech.com/htmls/worktern/images/featured.png" alt=""
                            class="imgPosition">
                            </span>

                            <div class="flex items-center gap-2">
                                <Icon name="material-symbols:check" class="text-white bg-green-400 rounded-full" /><a
                                    class="text-base font-semibold">{{ item.heading
                                    }}</a>
                            </div>
                            <h2 class="text-xl text-gray-600 my-3">{{ item.text }}</h2>
                            <p class="text-gray-500">{{ item.description }}</p>
                        </div>

                        <div class="w-2/6 border-l">
                            <ul class="py-10 px-8 leading-8">
                                <li>
                                    <Icon name="fluent-emoji-flat:heavy-dollar-sign" class="w-4 h-4" />
                                    {{ item.professional }}
                                </li>
                                <li>
                                    <Icon :name="item.icon" class="w-5 h-5" />
                                    {{ item.national }}
                                </li>
                                <li>
                                    <Icon :name="item.folderIcon" class="text-blue-600 w-5 h-5" />
                                    {{ item.typeTime }}
                                </li>
                                <li>
                                    <Icon :name="item.clockIcon" class="text-red-600 w-4 h-4" />

                                    {{ item.duration }}
                                </li>
                                <li>
                                    <Icon :name="item.jobIcon" class="text-purple-500" />

                                    {{ item.job }}
                                </li>
                                <li>
                                    <Icon :name="item.heartIcon" />
                                    {{ item.save }}
                                </li>
                                <li class="flex justify-center mt-5">
                                    <a href="#" class="primary-button w-full">
                                        {{ item.aButton }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- <Icon name="material-symbols:check" /> -->

    </NuxtLayout>

</template>
