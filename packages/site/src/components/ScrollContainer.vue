<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { debounce } from 'debounce';

interface Props {
  modelValue?: number;
}

interface Emits {
  (e: 'scroll', y: number): void;
  (e: 'update:modelValue', y: number): void;
}

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
});

const root = ref<HTMLElement | null>(null);

const onScroll = debounce(function emitScroll() {
  const scroll = root.value!.scrollTop;
  emit('scroll', scroll);
  emit('update:modelValue', scroll);
}, 100);

watch(() => props.modelValue, function scrollY(value) {
  root.value!.scrollTop = value;
})

onMounted(() => {
  root.value!.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
  root.value!.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <div class="scroll-container" ref="root">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  .scroll-container {
    overflow-y: auto;

    // TODO Use contenteditable instead of textarea
    textarea {
      overflow: hidden;
      resize: none;
      height: 100rem;
    }
  }
</style>
