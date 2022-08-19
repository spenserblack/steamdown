<script setup lang="ts">
import { ref, computed } from 'vue';
import parse from 'steamdown';
import Preview from './components/ParsedPreview.vue';
import ScrollContainer from './components/ScrollContainer.vue';
import defaultMd from './default-demo.md?raw';

const md = ref(defaultMd);
const previewPlacement = ref<'none' | 'right' | 'bottom'>('right');
const steamdown = computed(() => parse(md.value));

const previewScroll = ref(0);
</script>

<template>
  <i-container>
    <i-row>
      <i-column><h1>Steamdown</h1></i-column>
    </i-row>
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
          <i-textarea class="monospace" v-model="md" />
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
</template>

<style lang="scss">
.steamdown-view {
  height: 20rem;
};
</style>
