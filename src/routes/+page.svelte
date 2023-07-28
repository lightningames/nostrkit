<script>
  import "@picocss/pico";
  import DarkModeToggle from '$lib/DarkModeToggle.svelte';

  let number;
  /**
   * @type {string}
   */
  let pubKey;
  /**
   * @type {string}
   */
  let privKey;

  async function getKeys() {
    const response = await fetch('/getKeys');
    number = await response.json();
    pubKey = number.pk
    privKey = number.sk
  }
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
        <li><a href="#">What's NOSTR?</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="#">Self Hosting</a></li>
          <DarkModeToggle/>
      </ul>
    </nav>
  </header>
  <main class="container">
  <hr />
  <h1>Welcome to <span class="nostr-text">NOSTRKIT<span></h1>
  <br />
  <h3>Your one stop shop to get started with <span class="nostr-text">NOSTR.</span></h3>
  <br />
  <p>We make it simple to get started with the world's first truly decentralized social media platform. <a href="#" class="nostr-text">Get Started Now!</a></p>
  <p>Services Offered:</p>
    <article>
      <h4>Public/Private Key Creation</h4>
      <p>All you really need to access the NOSTR protocol</p>
    </article>
    <article>
      <h4>NIP-05 Address Creation</h4>
      <p>Create your own custom NOSTR handle! See the 'Self-Hosting' link above if you already have a preferred domain.</p>
    </article>
    <article>
      <h4>Lightning Address Integration</h4>
      <p>Integrate your Lightning Address to send and receive payments (Zaps!) in real-time.</p>
    </article>

  <button on:click={getKeys}>Generate your keys!</button>
  <div class="container">
    <p>{`Public Key: ${pubKey}`}</p>
  </div>
  <div class="container">
    <p>{`Private Key: ${privKey}`}</p>
  </div>
</main>
</body>

<style>
  .vertical-stack {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  .nostr-text {
    color: #6a359c;
    text-decoration: none;
  }
</style>