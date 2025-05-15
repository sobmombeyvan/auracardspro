<template>
  <div :id="values.id" class="jokard-template-profile pb-5">
    <div
        :style="`background: url(${values.backgroundImage && values.backgroundImage[0] ? generateUrlFile(values.backgroundImage[0].path) : generateUrlFile('')})`"
        class="w-full overflow-hidden !bg-cover !bg-no-repeat !bg-center flex justify-end items-start p-4"
        :class="preview ? 'h-36' : 'h-52'"
    >
      <NuxtImg v-if="values.logoCompany[0]"
               height="100"
               :src="generateUrlFile(values.logoCompany[0]!.path)" class="h-10 object-contain"/>
    </div>
    <div v-if="values.profilePicture[0]" :class="preview ? 'h-36 w-36 -mt-16' : 'h-52 w-52 -mt-20'" class="rounded-full overflow-hidden border ml-2">
      <NuxtImg height="400" width="400"
               :src="generateUrlFile(values.profilePicture[0]!.path)"/>
    </div>
    <div class="text-left px-4 mt-2">
      <h2 class="font-bold" v-if="values.firstname || values.lastname" :class="preview ? 'text-2xl' : 'text-3xl'">{{ `${values.firstname} ${values.lastname}` }}</h2>
      <p v-if="values.heading" :class="preview ? 'text-sm' : 'text-lg'">{{ values.heading }}</p>
      <p v-if="values.subHeading" class="font-semibold" :class="preview ? 'text-xs' : 'text-sm'">{{ values.subHeading }}</p>
    </div>
    <div v-if="values.icons.length > 0" class="px-4 mt-4 flex flex-wrap items-center gap-2 justify-start">
      <a :href="getLinkIcon(icon)" target="_blank" v-for="icon in values.icons" class="rounded-full jokard-profile-icon bg-white p-2 flex justify-center items-center"
         :class="preview ? 'h-10 w-10' : 'h-12 w-12'">
        <UtilsLucidIcon :name="icon.type" :size="20" class="" :strokeWidth="2" />
      </a>
    </div>
    <a v-if="vcfUrl || preview" :href="vcfUrl || '#'" :download="`${values.firstname}-${values.lastname}`" class="w-[60%] jokard-profile-button rounded-full mt-4 block p-2 text-center ml-3" size="sm">{{ values.buttonLabel }}</a>
  </div>
</template>

<script setup lang="ts">
import type {IconProfileBlockProps, ProfileBlockProps} from "~/types/ProfileBlockProps";
import generateUrlFile from "~/utils/generateUrlFile";

const props = defineProps<{
  preview?: boolean;
  values: ProfileBlockProps;
  vcfUrl?: string | null;
}>();

function getLinkIcon(icon: IconProfileBlockProps){
  switch (icon.type){
    case 'Smartphone':
      return `tel:${icon.value}`;
    case 'Phone':
      return `tel:${icon.value}`;
    case 'Mail':
      return `mailto:${icon.value}`;
    case 'MessageSquare':
      return `sms:${icon.value}`;
    case 'MapPin':
      return `${icon.value}`;
    case 'Printer':
      return `fax:${icon.value}`;
  }
}
</script>

<style scoped>

</style>