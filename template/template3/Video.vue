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
    <div class="grid gap-3">
      <div class="h-[250px]" v-if="videoURL">
        <iframe
            class="w-full h-full object-cover"
            :src="videoURL"
            :title="`${values.type} Video`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
      </div>
      <span v-else class=" block font-semibold text-sm p-3 text-center h-32">URL de vidéo invalide. Veuillez fournir une URL YouTube ou Vimeo valide.</span>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import type {VideoBlockProps} from "~/types/VideoBlockProps";
import getVideoURL from "~/utils/getVideoURL";

const props = defineProps<{
  preview?: boolean;
  values: VideoBlockProps
}>();
const videoURL = ref<null | string>(null);

onMounted(() => {
  videoURL.value = getVideoURL(props.values);
})

watch(props.values,(newVal, odlVal) => {
  videoURL.value = getVideoURL(newVal);
})
</script>

<style scoped>

</style>