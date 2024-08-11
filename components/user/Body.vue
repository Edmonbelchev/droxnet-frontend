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
        <div class="bg-white rounded-md">
          <h3 class="text-xl text-black p-6">Crafted Projects</h3>
          <div
            class="flex flex-wrap"
            v-if="user.projects && user.projects.length > 0"
          >
            <UserProjectItem
              :project="project"
              v-for="(project, index) in user.projects"
              :key="index"
            />
          </div>

          <div class="flex px-6 pb-6" v-else>
            <p class="text-[--text-color]">No projects found.</p>
          </div>
        </div>

        <div class="bg-white rounded-md pb-6">
          <h3 class="text-xl text-black p-6">Experience</h3>

          <div class="flex flex-col" v-if="user.experiences && user.experiences.length > 0">
            <UserExperienceItem
              :experience="experience"
              v-for="(experience, index) in user.experiences"
              :key="index"
              :className="[
                index % 2 === 0 ? 'p-6 bg-[#fafafa]' : 'p-5 bg-white',
              ]"
            />
          </div>

          <div class="flex px-6" v-else>
            <p class="text-[--text-color]">No experiences found.</p>
          </div>
        </div>

        <div class="bg-white rounded-md pb-6">
          <h3 class="text-xl text-black p-6">Education</h3>

          <div v-if="user.educations && user.educations.length > 0">
            <UserEducationItem
              :education="education"
              v-for="(education, index) in user.educations"
              :key="index"
              :className="[
                index % 2 === 0 ? 'p-6 bg-[#fafafa]' : 'p-5 bg-white',
              ]"
            />
          </div>

          <div class="flex px-6" v-else>
            <p class="text-[--text-color]">No educations found.</p>
          </div>
        </div>
      </div>

      <div class="max-w-[580px] lg:max-w-[350px] w-full flex flex-col gap-6">
        <div class="flex flex-col bg-white p-6 rounded-md">
          <h4 class="border-b mb-6 pb-4 text-xl text-[--text-color]">
            My Skills
          </h4>

          <div v-if="user.skills && user.skills.length > 0">
            <UserSkillItem
              :skill="skill"
              v-for="(skill, index) in user.skills"
              :key="index"
            />
          </div>

          <div class="flex" v-else>
            <p class="text-[--text-color]">No skills found.</p>
          </div>
        </div>

        <div class="flex flex-col bg-white p-6 rounded-md">
          <h4 class="border-b mb-6 pb-4 text-xl text-[--text-color]">
            Awards & Certifications
          </h4>

          <div v-if="user.awards && user.awards.length > 0">
            <UserAwardItem
              :award="award"
              v-for="(award, index) in user.awards"
              :key="index"
              :className="[
                'flex',
                index != user.awards.length - 1 ? 'mb-6' : 'mb-0',
              ]"
            />
          </div>

          <div class="flex" v-else>
            <p class="text-[--text-color]">No awards found.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>