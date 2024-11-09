<script lang="ts">
  import { parse as parseSteamdown, render as renderMarkup } from "@steamdown/core";
  import { render as renderHtml } from "@steamdown/html";
  import demo from "../demo.stmd?raw";
  let tab = $state<"editor" | "preview" | "markup" | "tree" >("editor");
  let steamdown = $state(demo);
  let parsedSteamdown = $derived(parseSteamdown(steamdown));
  let renderedMarkup = $derived(renderMarkup(parsedSteamdown.tree, parsedSteamdown.context));
  let renderedHtml = $derived(renderHtml(parsedSteamdown.tree, parsedSteamdown.context));

  let showCopySuccess = $state(false);
  const copyMarkup = async () => {
    await navigator.clipboard.writeText(renderedMarkup);
    showCopySuccess = true;
    setTimeout(() => showCopySuccess = false, 1000);
  };
</script>

<div class="editor">
  <div class="editor-controls">
    <button class="tab" class:active={tab === "editor"} onclick={() => tab = "editor"}>Editor</button>
    <button class="tab" class:active={tab === "preview"} onclick={() => tab = "preview"}>Preview</button>
    <button class="tab" class:active={tab === "markup"} onclick={() => tab = "markup"}>Markup</button>
    <button class="tab" class:active={tab === "tree"} onclick={() => tab = "tree"}>Tree</button>
  </div>
  <div class="editor-content">
    <button class="copy" onclick={copyMarkup}>Cop{#if showCopySuccess}ied{:else}y{/if} Markup</button>
    {#if tab === "editor"}
      <textarea rows="25" cols="88" class="editor" bind:value={steamdown}></textarea>
    {:else if tab === "preview"}
      <div class="preview">{@html renderedHtml}</div>
    {:else if tab === "markup"}
      <pre class="markup">{renderedMarkup}</pre>
    {:else if tab === "tree"}
      <pre class="tree">{JSON.stringify(parsedSteamdown.tree, null, 2)}</pre>
    {/if}
  </div>
</div>

<style>
  .editor {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 50rem;
    max-width: 100%;
    bottom: 0;
  }
  .editor-content {
    display: flex;
    border: 1px solid var(--color-border);
    max-height: 25rem;
    overflow: auto;
    position: relative;
  }
  textarea.editor {
    display: block;
    font-family: monospace;
    font-size: 1rem;
    padding: 0.5rem;
    border: none;
    resize: none;
    width: 100%;
  }
  .tab {
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
  }
  .tab.active {
    border: 1px solid #888;
    border-bottom: none;
  }
  .copy {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    z-index: 1;
  }


  :global(.preview em) {
    font-style: italic;
  }
  :global(.preview strong) {
    font-weight: bold;
  }
  :global(.preview u) {
    text-decoration: underline;
  }
  :global(.preview .spoiler) {
    background-color: black;
    color: black;
  }
  :global(.preview .spoiler:hover) {
    color: white;
  }
  :global(.preview s) {
    text-decoration: line-through;
  }
  :global(.preview .quote) {
    border: 1px solid var(--color-border);
    border-radius: 5px;
    padding: 0.5rem;
  }
  :global(.preview .quote cite) {
    font-style: italic;
    font-weight: bold;
    text-decoration: underline;
  }
  :global(.preview pre.code) {
    border: 1px solid var(--color-border);
    border-radius: 5px;
    padding: 0.5rem;
    font-family: monospace;
  }
  :global(.preview a) {
    color: var(--color-fg);
    text-decoration: underline;
  }
  :global(.preview table) {
    border-collapse: collapse;
  }
  :global(.preview table th),
  :global(.preview table td) {
    border: 1px solid var(--color-border);
    padding: 0.5rem;
  }
</style>
