<template>
  <div
      :id="values.id"
    class="jokard-template-social-link flex flex-col bg-white py-5 px-4"
    :class="preview ? 'gap-2' : 'gap-4'"
  >
    <template v-if="values.activateTitle">
      <h2
        :class="
          preview
            ? `text-2xl ${values.headingStyle.alignment + ' ' + values.headingStyle.fontStyle.join(' ')}`
            : `text-3xl ${values.headingStyle.alignment + ' ' + values.headingStyle.fontStyle.join(' ')}`
        "
      >
        {{ values.heading }}
      </h2>
      <p
        :class="
          preview
            ? `text-lg jokard-subtitle-color ${values.subHeadingStyle.alignment + ' ' + values.subHeadingStyle.fontStyle.join(' ')}`
            : `text-xl jokard-subtitle-color ${values.subHeadingStyle.alignment + ' ' + values.subHeadingStyle.fontStyle.join(' ')}`
        "
      >
        {{ values.subHeading }}
      </p>
    </template>
    <div class="border-t flex flex-col items-start justify-start">
      <a
      v-for="item in values.items" 
        :href="item.value"
        class="border-b  py-3 w-full flex items-center justify-between"
      >
        <div class="flex items-center justify-start gap-3">
          <div class="h-16 w-16 rounded-full overflow-hidden border">
            <NuxtImg
              height="400"
              width="400"
              :src="generateUrlFile(item.image[0]!.path)"
              class="h-full w-full object-cover"
            />
          </div>
          <div>
            <p class="text-xl jokard-title-color leading-none">{{ item.heading }}</p>
            <p class="text-sm jokard-subtitle-color">{{ item.subHeading }}</p>
          </div>
        </div>
        <ChevronRight class="size-8 jokard-title-color" :absoluteStrokeWidth="true" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import type { SocialLinkBlockProps } from "~/types/SocialLinkBlockProps";
import generateUrlFile from "~/utils/generateUrlFile";

const props = defineProps<{
  preview?: boolean;
  values: SocialLinkBlockProps;
}>();
</script>

<style scoped></style>
