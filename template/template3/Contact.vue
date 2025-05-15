<template>
  <div :id="values.id" class="px-2 w-full">
  <div class="jokard-template-contact flex flex-col px-4  bg-white py-5 gap-4">
    <h2 v-if="values.heading" class="font-bold text-left" :class="preview ? 'text-2xl' : 'text-3xl'">{{ values.heading }}</h2>
    <div class="border-t pt-6 space-y-5" v-if="values.items.length > 0">
      <template v-for="(item, index) in values.items" :key="index">
        <div v-if="item.type === 'Number'">
          <p v-if="item.values.label" class="text-lg jokard-title-color leading-none">{{ item.values.label }}</p>
          <a :href="'tel:'+(item.values as ContactNumberBlockProps).value" target="_blank" v-if="(item.values as ContactNumberBlockProps).value" class="text-sm jokard-subtitle-color">{{ (item.values as ContactNumberBlockProps).value }}</a>
        </div>
        <div v-if="item.type === 'Email'">
          <p v-if="item.values.label" class="text-lg jokard-title-color leading-none">{{ item.values.label }}</p>
          <a :href="'mailto:'+(item.values as ContactEmailBlockProps).value" v-if="(item.values as ContactEmailBlockProps).value" class="text-sm jokard-subtitle-color">{{ (item.values as ContactEmailBlockProps).value }}</a>
        </div>
          <div v-if="item.type === 'Adress'">
            <p v-if="item.values.label" class="text-lg jokard-title-color leading-none">{{ item.values.label }}</p>
            <p v-if="(item.values as ContactAdressBlockProps).line1" class="text-sm leading-tight jokard-subtitle-color">{{ (item.values as ContactAdressBlockProps).line1 }}</p>
            <p v-if="(item.values as ContactAdressBlockProps).line2" class="text-sm leading-tight jokard-subtitle-color">{{ (item.values as ContactAdressBlockProps).line2 }}</p>
            <p class="text-sm leading-tight jokard-subtitle-color">{{ `${(item.values as ContactAdressBlockProps).city},` }} {{ `${(item.values as ContactAdressBlockProps).state},` }} {{ `${(item.values as ContactAdressBlockProps).zipCode}` }}</p>
            <p class="text-sm jokard-subtitle-color leading-tight">{{ `${(item.values as ContactAdressBlockProps).country}` }}</p>

            <a v-if="(item.values as ContactAdressBlockProps).locationLabel" :href="(item.values as ContactAdressBlockProps).locationURL">
              <Button size="sm" class=" rounded-full jokard-button gap-2 mt-2">
                <UtilsLucidIcon name="Signpost" :size="20"/>
                {{ (item.values as ContactAdressBlockProps).locationLabel }}
              </Button>
            </a>
          </div>
      </template>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ContactAdressBlockProps,
  ContactBlockProps,
  ContactEmailBlockProps,
  ContactNumberBlockProps
} from "~/types/ContactBlockProps";

const props = defineProps<{
  preview?: boolean;
  values: ContactBlockProps
}>();
</script>

<style scoped>

</style>