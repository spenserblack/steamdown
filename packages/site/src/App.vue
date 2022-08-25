<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import * as octicons from '@primer/octicons';
import parse from 'steamdown';
import { version } from '../package.json';
import Preview from './components/ParsedPreview.vue';
import ScrollContainer from './components/ScrollContainer.vue';
import defaultMd from './default-demo.md?raw';

const ghIcon = octicons['mark-github'].toSVG({
  'aria-label': 'Repository',
});

const md = ref(defaultMd);
const previewPlacement = ref<'none' | 'right' | 'bottom'>('right');
const steamdown = computed(() => parse(md.value));

const elementHeight = ref(0);
const previewScroll = ref(0);

const resizing = ref(false);
function onInput(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  resizing.value = true;
  nextTick(() => {
    elementHeight.value = target.scrollHeight;
    resizing.value = false;
  });
}
onMounted(() => {
  elementHeight.value = (document.querySelector('textarea') as HTMLTextAreaElement).scrollHeight;
});
const textareaStyle = computed(() => ({
  height: resizing.value ? 'auto' : `${elementHeight.value}px`,
  resize: 'none',
  overflowY: 'hidden',
}));
</script>

<template>
  <i-layout>
    <i-layout-header>
      <i-container>
        <i-row>
          <i-column><h1>Steamdown</h1></i-column>
        </i-row>
      </i-container>
    </i-layout-header>
    <i-layout-content>
      <i-container>
        <i-row>
          <i-column><h2>Demo</h2></i-column>
        </i-row>
        <i-row>
          <i-column>
            <i-radio-group v-model="previewPlacement">
              <i-radio value="none" native>None</i-radio>
              <i-radio value="right" native>Right</i-radio>
              <i-radio value="bottom" native>Bottom</i-radio>
            </i-radio-group>
          </i-column>
        </i-row>
        <i-row>
          <i-column>
            <ScrollContainer class="steamdown-view" v-model="previewScroll">
              <i-textarea :style="textareaStyle" @input="onInput" class="monospace" v-model="md" />
            </ScrollContainer>
          </i-column>
          <i-column v-if="previewPlacement === 'right'">
            <ScrollContainer class="steamdown-view" v-model="previewScroll">
              <Preview :content="steamdown" />
            </ScrollContainer>
          </i-column>
        </i-row>
        <i-row v-if="previewPlacement === 'bottom'" class="_margin-top:1/2">
          <i-column>
            <ScrollContainer class="steamdown-view" v-model="previewScroll">
              <Preview :content="steamdown" />
            </ScrollContainer>
          </i-column>
        </i-row>
      </i-container>
    </i-layout-content>
    <i-layout-footer>
      <i-container>
        <i-row>
          <i-column xs="2">
            <a href="https://github.com/spenserblack/steamdown">
              <span v-html="ghIcon"></span>
              GitHub
            </a>
          </i-column>
          <i-column xs="1" offset="9"><span class="text-version">v{{ version }}</span></i-column>
        </i-row>
      </i-container>
    </i-layout-footer>
  </i-layout>
</template>

<style lang="scss">
.steamdown-view {
  height: 20rem;
};
</style>

<style lang="scss" scoped>
.text-version {
  font-size: 0.9rem;
  font-style: italic;
  font-family: monospace;
  color: var(--color--dark-50);
}
</style>
