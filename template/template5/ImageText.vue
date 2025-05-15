<template>
  <div :id="values.id" class="jokard-template-image-text flex gap-2 bg-white overflow-hidden" :class="values.viewType === 'Text-Image' ? 'flex-col pt-5' : 'flex-col-reverse pb-5' ">
    <div class="px-2">
    <h2 :class="
        preview
          ? `text-2xl ${values.headingStyle.alignment + ' ' + values.headingStyle.fontStyle.join(' ')}`
          : `text-3xl ${values.headingStyle.alignment + ' ' + values.headingStyle.fontStyle.join(' ')}`
      ">{{ values.heading }}</h2>
    <p :class="
        preview
          ? `text-lg ${values.subHeadingStyle.alignment + ' ' + values.subHeadingStyle.fontStyle.join(' ')}`
          : `text-xl ${values.subHeadingStyle.alignment + ' ' + values.subHeadingStyle.fontStyle.join(' ')}`
      ">{{ values.subHeading }}</p>
      </div>
    <div class="bg-muted h-[450px]">
      <NuxtImg
          height="500"
          width="800"
          :src="generateUrlFile(values.image[0]!.path)"
          class="h-full w-full object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ImageTextBlockProps} from "~/types/ImageTextBlockProps";
import generateUrlFile from "~/utils/generateUrlFile";

const props = defineProps<{
  preview?: boolean;
  values: ImageTextBlockProps
}>();
</script>

<style scoped>

</style>