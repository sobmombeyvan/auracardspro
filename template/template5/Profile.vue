<template>
  <div :id="values.id" class="jokard-template-profile flex flex-col items-center px-4 justify-center py-5 gap-4">
    <div v-if="values.logoCompany[0]" class="jokard-profile-logo">
      <NuxtImg height="100"
               :src="generateUrlFile(values.logoCompany[0]!.path)" class="object-contain h-20"/>
    </div>
    <div class="jokard-template-profile-block grid grid-cols-2 w-full overflow-hidden rounded-3xl">
      <div v-if="values.profilePicture[0]" class="w-full"
           :class="preview ? 'h-60' : 'h-72'">
        <div class="h-full w-full overflow-hidden">
          <NuxtImg height="400" width="400"
                   :src="generateUrlFile(values.profilePicture[0]!.path)" class="object-cover h-full w-full"/>
        </div>
      </div>
      <div class="text-left flex flex-col justify-center items-start p-4 w-full">
        <h2 class="font-bold" v-if="values.firstname || values.lastname" :class="preview ? 'text-2xl' : 'text-3xl'">
          {{ `${values.firstname} ${values.lastname}` }}</h2>
        <p v-if="values.heading" :class="preview ? 'text-sm' : 'text-lg'">{{ values.heading }}</p>
        <p v-if="values.subHeading" class="font-semibold" :class="preview ? 'text-xs' : 'text-sm'">{{
            values.subHeading
          }}</p>
      </div>
    </div>

    <div v-if="values.icons.length > 0" class=" flex flex-wrap items-center gap-2 justify-start">
      <a :href="getLinkIcon(icon)" target="_blank" v-for="icon in values.icons"
         class="rounded-full jokard-profile-icon bg-white p-2 flex justify-center items-center"
         :class="preview ? 'h-12 w-12' : 'h-14 w-14'">
        <UtilsLucidIcon :name="icon.type" :size="30" class="" :strokeWidth="2"/>
      </a>
    </div>
    <a v-if="vcfUrl || preview" :href="vcfUrl || '#'" :download="`${values.firstname}-${values.lastname}`"
       class="w-[80%] jokard-profile-button block text-center p-2 rounded-full">{{ values.buttonLabel }}</a>
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