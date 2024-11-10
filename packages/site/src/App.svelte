<script lang="ts">
  import Editor from './lib/Editor.svelte'
</script>

<main>
  <h1>Steamdown</h1>
  <p>
    Welcome to the beta test of the new version of Steamdown! Previously, it just used
    an existing Markdown renderer, and used a bunch of settings overrides to hack it
    into something that could render to Steam's markup. Now, it has its own parser and
    renderer written specifically with Steam's markup in mind. There's some new syntax,
    some changed syntax, and some removed syntax, with the goal of handling the
    possibilities and limitations of Steam's markup. View the
    <a href="https://github.com/spenserblack/steamdown">GitHub Repository</a>
    for more information on the changes.
  </p>
  <p>
    As this is a beta test, you may encounter some parsing or rendering issues. If you
    do, please <a href="https://github.com/spenserblack/steamdown/issues/new">open an issue</a>
    and report the problem.
  </p>
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
