<template>

  <div id="jokard-template-2" style="background-image: var(--jokard-background-image)"
       class="jokard-template relative w-full min-h-screen pb-32 flex flex-col items-center justify-center">
    <div class="max-w-lg w-full mx-auto">
      <template v-for="(item, index) in blocks!" :key="index">
        <TemplateTemplate2Profile v-if="item.type === 'profile' && item.values.activate" :preview="preview"
                                  :values="(item.values as ProfileBlockProps)" :vcfUrl="vcfUrl"/>
        <div class="px-2 mb-4">
          <TemplateTemplate2HeadingText v-if="item.type === 'heading-text' && item.values.activate" :preview="preview"
                                        :values="(item.values as HeadingTextBlockProps)"/>
          <TemplateTemplate2Contact v-if="item.type === 'contact' && item.values.activate" :preview="preview"
                                    :values="(item.values as ContactBlockProps)"/>
          <TemplateTemplate2SocialLink v-if="item.type === 'social-link' && item.values.activate" :preview="preview"
                                       :values="(item.values as SocialLinkBlockProps)"/>
          <TemplateTemplate2ImageText v-if="item.type === 'image-text' && item.values.activate" :preview="preview"
                                      :values="(item.values as ImageTextBlockProps)"/>
          <TemplateTemplate2Images v-if="item.type === 'images' && item.values.activate" :preview="preview"
                                   :values="(item.values as ImagesBlockProps)"/>
          <TemplateTemplate2Video v-if="item.type === 'video' && item.values.activate" :preview="preview"
                                  :values="(item.values as VideoBlockProps)"/>
          <TemplateTemplate2Pdf v-if="item.type === 'pdf' && item.values.activate" :preview="preview"
                                :values="(item.values as PdfBlockProps)"/>
        </div>
      </template>
    </div>
    <NuxtLink v-if="!preview" to="/dashboard/bcards/add" class="flex items-center w-auto rounded-full border pr-4 pl-1 bg-black mt-6 shadow-xl">
      <NuxtImg src="/images/logo_trans.png" class="sm:size-12 size-10"/>
      <span class="block text-white underline sm:text-sm text-xs">Obtenez votre propre page gratuitement !</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type {ContentBlockSettingBlocksProps} from "~/types/ContentBlockSettingProps";
import type {ProfileBlockProps} from "~/types/ProfileBlockProps";
import type {ImageTextBlockProps} from "~/types/ImageTextBlockProps";
import type {SocialLinkBlockProps} from "~/types/SocialLinkBlockProps";
import type {ContactBlockProps} from "~/types/ContactBlockProps";
import type {HeadingTextBlockProps} from "~/types/HeadingTextBlockProps";
import type {ImagesBlockProps} from "~/types/ImagesBlockProps";
import type {VideoBlockProps} from "~/types/VideoBlockProps";
import type {PdfBlockProps} from "~/types/PdfBlockProps";

const props = defineProps<{
  preview?: boolean;
  blocks: ContentBlockSettingBlocksProps[];
  vcfUrl?: string | null;
}>();
</script>

<style scoped>

</style>