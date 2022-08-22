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
  const scroll = root.value!.scrollTop / root.value!.scrollHeight;
  emit('scroll', scroll);
  emit('update:modelValue', scroll);
}, 100);

watch(() => props.modelValue, function scrollY(value) {
  const currentScrollTop = root.value!.scrollTop;
  const newScrollTop = value * root.value!.scrollHeight;
  if (Math.abs(currentScrollTop - newScrollTop) < 1) {
    return;
  }
  root.value!.scrollTop = newScrollTop;
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
  }
</style>
