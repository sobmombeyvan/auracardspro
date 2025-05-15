<template>

  <div id="jokard-template-1" style="background-image: var(--jokard-background-image)"
       class="jokard-template relative w-full min-h-screen pb-32 px-2">
    <div class="max-w-lg w-full mx-auto space-y-4">
      <template v-for="(item, index) in blocks!" :key="index">
        <TemplateTemplate1Profile v-if="item.type === 'profile' && item.values.activate" :vcfUrl="vcfUrl"
                                  :preview="preview" :values="(item.values as ProfileBlockProps)"/>
        <TemplateTemplate1HeadingText v-if="item.type === 'heading-text' && item.values.activate" :preview="preview"
                                      :values="(item.values as HeadingTextBlockProps)"/>
        <TemplateTemplate1Contact v-if="item.type === 'contact' && item.values.activate" :preview="preview"
                                  :values="(item.values as ContactBlockProps)"/>
        <TemplateTemplate1SocialLink v-if="item.type === 'social-link' && item.values.activate" :preview="preview"
                                     :values="(item.values as SocialLinkBlockProps)"/>
        <TemplateTemplate1ImageText v-if="item.type === 'image-text' && item.values.activate" :preview="preview"
                                    :values="(item.values as ImageTextBlockProps)"/>
        <TemplateTemplate1Images v-if="item.type === 'images' && item.values.activate" :preview="preview"
                                    :values="(item.values as ImagesBlockProps)"/>
        <TemplateTemplate1Video v-if="item.type === 'video' && item.values.activate" :preview="preview"
                                 :values="(item.values as VideoBlockProps)"/>
        <TemplateTemplate1Pdf v-if="item.type === 'pdf' && item.values.activate" :preview="preview"
                                :values="(item.values as PdfBlockProps)"/>
      </template>
    </div>
    <NuxtLink v-if="!preview" to="/dashboard/bcards/add"
              class="flex items-center rounded-full border max-w-max mx-auto pr-4 pl-1 bg-black mt-6 shadow-xl">
      <NuxtImg src="/images/logo_trans.png" class="size-12"/>
      <span class="block text-white underline">Obtenez votre propre page gratuitement !</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type {ContentBlockSettingBlocksProps} from "~/types/ContentBlockSettingProps";
import type {ProfileBlockProps} from "~/types/ProfileBlockProps";
import type {ImageTextBlockProps} from "~/types/ImageTextBlockProps"
import type {ImagesBlockProps} from "~/types/ImagesBlockProps";
import type {SocialLinkBlockProps} from "~/types/SocialLinkBlockProps";
import type {ContactBlockProps} from "~/types/ContactBlockProps";
import type {HeadingTextBlockProps} from "~/types/HeadingTextBlockProps";
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