<template>
  <div :id="values.id"
       class="jokard-template-profile flex flex-col items-center overflow-hidden relative justify-center pb-5 gap-4">
    <div v-if="values.profilePicture[0]" class="border-4 jokard-template-profile-image relative rounded-full overflow-hidden"
         :class="preview ? 'h-[30rem] w-[30rem] -mt-[100px]' : 'h-[40rem] w-[40rem] -mt-[150px]'">
      <div class="h-full w-full overflow-hidden" :class="preview ? 'mt-[100px]' : 'mt-[150px]'">
        <NuxtImg height="400" width="400"
                 :src="generateUrlFile(values.profilePicture[0]!.path)" class="object-cover h-full w-full"/>
      </div>
      <div v-if="values.logoCompany[0]" :class="preview ? 'h-16 w-16' : 'h-20 w-20'"
           class="rounded-full jokard-profile-logo border absolute overflow-hidden top-[170px] right-[100px] z-50">
        <NuxtImg height="100" width="100"
                 :src="generateUrlFile(values.logoCompany[0]!.path)" class="object-cover"/>
      </div>
    </div>
    <div class="px-4 w-full flex flex-col items-center justify-center gap-4">
      <div class="text-center">
        <h2 class="font-bold" v-if="values.firstname || values.lastname" :class="preview ? 'text-2xl' : 'text-3xl'">
          {{ `${values.firstname} ${values.lastname}` }}</h2>
        <p v-if="values.heading" :class="preview ? 'text-sm' : 'text-lg'">{{ values.heading }}</p>
        <p v-if="values.subHeading" class="font-semibold" :class="preview ? 'text-xs' : 'text-sm'">{{
            values.subHeading
          }}</p>
      </div>
      <a v-if="vcfUrl || preview" :href="vcfUrl || '#'" :download="`${values.firstname}-${values.lastname}`"
         class="w-full jokard-profile-button block text-center p-2 rounded-full">{{ values.buttonLabel }}</a>
      <div v-if="values.icons.length > 0" class=" flex flex-wrap items-center gap-2 justify-start">
        <a :href="getLinkIcon(icon)" target="_blank" v-for="icon in values.icons"
           class="rounded-full jokard-profile-icon bg-white p-2 flex justify-center items-center"
           :class="preview ? 'h-12 w-12' : 'h-14 w-14'">
          <UtilsLucidIcon :name="icon.type" :size="30" class="" :strokeWidth="2"/>
        </a>
      </div>
    </div>
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

function getLinkIcon(icon: IconProfileBlockProps) {
  switch (icon.type) {
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