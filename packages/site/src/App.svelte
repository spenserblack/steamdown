<script lang="ts">
  import Editor from './lib/Editor.svelte'
</script>

<main>
  <h1>Steamdown</h1>
  <Editor />
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
