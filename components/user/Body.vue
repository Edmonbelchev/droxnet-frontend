<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="px-4 py-8">
    <div class="flex flex-col lg:flex-row max-w-[1110px] gap-8 w-full mx-auto">
      <div class="lg:max-w-[730px] flex flex-col gap-6 w-full">
        <div class="bg-white rounded-md" v-if="user.projects && user.projects.length > 0">
          <h3 class="text-xl text-black p-6">Crafted Projects</h3>
          <div class="flex flex-wrap">
            <UserProjectItem
              :project="project"
              v-for="(project, index) in user.projects"
              :key="index"
            />
          </div>
        </div>

        <div class="bg-white rounded-md pb-6" v-if="user.experiences && user.experiences.length > 0">
          <h3 class="text-xl text-black p-6">Experience</h3>
          <UserExperienceItem
            :experience="experience"
            v-for="(experience, index) in user.experiences"
            :key="index"
            :className="[
              index % 2 === 0 ? 'p-6 bg-[#fafafa]' : 'p-5 bg-white',
            ]"
          />
        </div>

        <div class="bg-white rounded-md pb-6" v-if="user.educations && user.educations.length > 0">
          <h3 class="text-xl text-black p-6">Education</h3>
          <UserEducationItem
            :education="education"
            v-for="(education, index) in user.educations"
            :key="index"
            :className="[
              index % 2 === 0 ? 'p-6 bg-[#fafafa]' : 'p-5 bg-white',
            ]"
          />
        </div>
      </div>

      <div class="max-w-[580px] lg:max-w-[350px] w-full">
        <div class="flex flex-col bg-white p-6 rounded-md" v-if="user.awards && user.awards.length > 0">
          <h4 class="border-b mb-6 pb-4 text-xl text-[--text-color]">
            Awards & Certifications
          </h4>

          <UserAwardItem
            :award="award"
            v-for="(award, index) in user.awards"
            :key="index"
            :className="['flex', index != (user.awards.length - 1) ? 'mb-6' : 'mb-0']"
          />
        </div>
      </div>
    </div>
  </div>
</template>