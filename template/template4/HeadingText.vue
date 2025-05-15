<template>
  <div :id="values.id" class="px-2 w-full">
    <div
        class="jokard-template-heading-desc flex flex-col py-5 px-4"
        :class="preview ? 'gap-3' : 'gap-4'"
    >
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
          ? `text-sm ${values.descriptionStyle.alignment + ' ' + values.descriptionStyle.fontStyle.join(' ')}`
          : `text-lg ${values.descriptionStyle.alignment + ' ' + values.descriptionStyle.fontStyle.join(' ')}`
      "
      >
        {{ values.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {HeadingTextBlockProps} from "~/types/HeadingTextBlockProps";

const props = defineProps<{
  preview?: boolean;
  values: HeadingTextBlockProps;
}>();
</script>

<style scoped></style>
