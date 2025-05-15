<template>
  <div :id="values.id" class="px-2 w-full">
  <div class="jokard-template-image-text flex flex-col gap-4 pt-4 bg-white overflow-hidden">
    <div class="px-2" v-if="values.activateTitle">
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
    <div class="grid gap-3 w-full overflow-hidden h-[500px]">
      <object v-if="values.pdf?.path" :data="generateUrlFile(values.pdf?.path)" type="application/pdf" class="w-full h-full max-w-full">
        <iframe :src="generateUrlFile(values.pdf?.path)" class="w-full border-none max-w-full h-full">
          This browser does not support PDFs. Please download the PDF to view it:
          <a :href="generateUrlFile(values.pdf?.path)">Download PDF</a>
        </iframe>
      </object>
      <span v-else class="block font-semibold text-sm p-3 text-center h-32">Veuillez fournir un PDF.</span>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import type {PdfBlockProps} from "~/types/PdfBlockProps";
import generateUrlFile from "~/utils/generateUrlFile";

const props = defineProps<{
  preview?: boolean;
  values: PdfBlockProps
}>();

</script>

<style scoped>

</style>