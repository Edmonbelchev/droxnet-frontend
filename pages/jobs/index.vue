<script setup>
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
  <NuxtLayout name="default">
    <div class="bg-[--background-color] py-20 px-10">
      <div class="max-w-screen-xl flex mx-auto">
        <div class="w-2/6"></div>
        <div class="w-4/6">
          <JobsCard
            :heading="item.heading"
            :text="item.text"
            :description="item.description"
            :professional="item.professional"
            :icon="item.icon"
            :folderIcon="item.folderIcon"
            :clockIcon="item.clockIcon"
            :heartIcon="item.heartIcon"
            :jobIcon="item.jobIcon"
            :national="item.national"
            :typeTime="item.typeTime"
            :duration="item.duration"
            :job="item.job"
            :save="item.save"
            :aButton="item.aButton"
            :badge="item.badge"
            v-for="(item, index) in divItems"
            :key="index"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
