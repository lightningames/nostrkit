<script>
  import '@picocss/pico';
  import DarkModeToggle from '$lib/DarkModeToggle.svelte';
  import OrderForm from '$lib/OrderForm.svelte';
  import { onMount } from 'svelte';
</script>

<body>
  <header class="container">
    <nav>
      <ul>
        <li class="vertical-stack">
          <strong>NOSTRKIT</strong>
          <small>by <a href="https://www.plebnet.dev">PlebNet.dev</a></small>
        </li>
      </ul>
      <ul>
        <li><a href="#">What is NOSTR?</a></li>
        <li><a href="/about">About NOSTRKIT</a></li>
        <li><a href="#">Self Hosting</a></li>
        <DarkModeToggle />
      </ul>
    </nav>
  </header>
  <main class="container">
    <OrderForm />
  </main>
</body>

<style>
  .vertical-stack {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  a {
    color: #6a359c;
  }
</style>
