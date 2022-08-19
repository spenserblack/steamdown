<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  content?: string;
}

const props = defineProps<Props>();

const copySuccess = ref(false);
async function onCopy() {
  await navigator.clipboard.writeText(props.content);
  copySuccess.value = true;
  setTimeout(() => {
    copySuccess.value = false;
  }, 1000);
};
</script>

<template>
  <i-card>
    <i-button :disabled="copySuccess" @click="onCopy">
      <i-icon v-show="copySuccess" name="ink-check" />
      Cop{{ copySuccess ? 'ied' : 'y' }}
    </i-button>
    <pre>{{ content }}</pre>
  </i-card>
</template>

<style lang="scss" scoped>
button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
