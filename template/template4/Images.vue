<template>
  <div :id="values.id" class="px-2 w-full">
    <div class="jokard-template-image-text flex flex-col gap-4 bg-white overflow-hidden"
         :class="values.type === 'Slide' ? 'py-4' : 'pt-4'">
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
      <template v-if="values.images.length > 0">
        <div v-if="values.type === 'Slide'" class="relative">
          <Carousel
              v-slot="{ canScrollNext }"
              :opts="{
              align: 'start',
              loop: true,
            }"
              class="relative lg:w-[80%] w-[70%] mx-auto">
            <CarouselContent>
              <CarouselItem
                  v-for="(image, idx) in values.images"
                  :key="idx"
              >
                <div class="h-[250px]">
                  <NuxtImg
                      height="500"
                      width="800"
                      :src="generateUrlFile(image!.path)"
                      class="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious class="left-1"/>
            <CarouselNext class="right-1" v-if="canScrollNext"/>
          </Carousel>
        </div>
        <div v-else class="grid gap-3"
             :class=" values.type === 'Grid-1' || values.type === 'Grid-2' ? 'grid-cols-2' : '' ">
          <div v-for="(image, index) in values.images" class="h-[250px]"
               :class=" index === 0 && values.type === 'Grid-2' ? 'col-span-2'  : ''" :key="index">
            <NuxtImg
                height="500"
                width="800"
                :src="generateUrlFile(image!.path)"
                class="h-full w-full object-cover"
            />
          </div>
        </div>
      </template>
      <span v-else class="block font-semibold text-sm p-3 text-center h-32">Veuillez selectionnez des images.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';
import type {ImagesBlockProps} from "~/types/ImagesBlockProps";
import generateUrlFile from "~/utils/generateUrlFile";

const props = defineProps<{
  preview?: boolean;
  values: ImagesBlockProps
}>();
</script>

<style scoped>

</style>