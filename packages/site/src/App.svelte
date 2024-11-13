<script lang="ts">
  import Editor from './lib/Editor.svelte'
  let parsedTime = $state<number | null>(null);
  let renderedTime = $state<number | null>(null);

  const onParsed = (timeTaken: number) => {
    parsedTime = timeTaken;
  }
  const onRendered = (timeTaken: number) => {
    renderedTime = timeTaken;
  }
</script>

<main>
  <h1>Steamdown</h1>
  <p>
    Welcome to the beta test of the new version of Steamdown! Previously, it used and
    applied overrides and extensions to
    <a href="https://marked.js.org/">Marked</a>, a JavaScript library that parses and
    renders Markdown. While <a href="https://marked.js.org/">Marked</a> is a great library, there were a few problems when
    overriding its behavior to target Steam's markup:
  </p>
  <ul>
    <li>Some of Markdown's syntax didn't have proper equivalents in Steam's markup.</li>
    <li>Since <a href="https://marked.js.org/">Marked</a> was built to render to HTML, some hacky methods needed to be taken (like un-escaping escaped HTML).</li>
    <li>There was a decent amount of unused code, since almost every renderer in <a href="https://marked.js.org/">Marked</a> was overridden.</li>
  </ul>
  <p>
    Now, it has its own parser and renderer written specifically with Steam's markup in
    mind. There's some new syntax, some changed syntax, and some removed syntax, with
    the goal of handling the possibilities and limitations of Steam's markup. View the
    <a href="https://github.com/spenserblack/steamdown">GitHub Repository</a>
    for more information on the changes.
  </p>
  <p>
    As this is a beta test, you may encounter some parsing or rendering issues. If you
    do, please <a href="https://github.com/spenserblack/steamdown/issues/new">open an issue</a>
    and report the problem.
  </p>
  <p>
    If you need to use the old site, you can find it at
    <a href="https://steamdown-legacy.vercel.app/">steamdown-legacy.vercel.app</a>.
  </p>
  <Editor {onParsed} {onRendered} />
  <div class="time-taken">
    {#if parsedTime !== null}
      <small>Parsed in: {parsedTime.toFixed(2)}ms</small>
    {/if}
    {#if renderedTime !== null}
      <small>Rendered in: {renderedTime.toFixed(2)}ms</small>
    {/if}
  </div>
</main>
<footer>
  <h6>Social</h6>
  <ul class="social">
    <li><a href="https://github.com/spenserblack/steamdown">GitHub</a></li>
  </ul>
</footer>

<style>
  footer {
    margin-top: 2rem;
    text-align: right;
  }
  footer ul.social {
    display: flex;
    justify-content: right;
    gap: 1rem;
  }
  footer ul.social li {
    list-style: none;
  }
</style>
