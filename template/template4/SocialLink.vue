<template>
  <div :id="values.id" class="px-2 w-full">
    <div
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
      <div class="grid grid-cols-3 items-start justify-center gap-2">
        <a
            v-for="item in values.items"
            :href="item.value"
            class="py-3 w-full flex items-center justify-center"
        >
          <div class="flex flex-col items-center overflow-hidden justify-center gap-2">
            <div class="h-16 w-16 rounded-2xl overflow-hidden border">
              <NuxtImg
                  height="400"
                  width="400"
                  :src="generateUrlFile(item.image[0]!.path)"
                  class="h-full w-full object-cover"
              />
            </div>
            <div>
              <p class="text-sm text-center jokard-subtitle-color truncate">{{ item.heading }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ChevronRight} from "lucide-vue-next";
import type {SocialLinkBlockProps} from "~/types/SocialLinkBlockProps";
import generateUrlFile from "~/utils/generateUrlFile";

const props = defineProps<{
  preview?: boolean;
  values: SocialLinkBlockProps;
}>();
</script>

<style scoped></style>
