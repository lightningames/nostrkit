<script>
  import "@picocss/pico";
  import DarkModeToggle from '$lib/DarkModeToggle.svelte';
  import { onMount } from 'svelte';

  let number;
  /**
   * @type {string}
   */
  let pubKey;
  /**
   * @type {string}
   */
  let privKey;

  let showPrivKey = false;

  /**
   * @type {string[]}
   */
  let takenNames = [];

  onMount(async() => {
    const response = await fetch('/get-nip05');
    const data = await response.json()
    console.log('this is data on mount\n', data)
    const chosenNames = data.mapping.names
    for (let takenName in chosenNames) {
      takenNames.push(takenName)
    }
    console.log('this is takenNames\n', takenNames)
  });

  async function getKeys() {
    const response = await fetch('/get-keys');
    number = await response.json();
    pubKey = number.pk
    privKey = number.sk
  }

  function togglePrivKey() {
    showPrivKey = !showPrivKey;
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
    <p>{pubKey ? `Public Key: ${pubKey}` : ''}</p>
  </div>
  <div class="container">
    <p>{privKey ? `Private Key: ${showPrivKey ? privKey : '**********'}` : ''}</p>
    <button on:click={togglePrivKey}>{showPrivKey ? 'Hide' : 'Show'} Private Key</button>
  </div>
  <div class="container">
    <h3>Make your own NIP-05</h3>
    <input
      type="text"
      autocomplete="off"
      on:input={(e) => {
        if (takenNames.indexOf(e.target.value) > -1) {
          console.log(takenNames.indexOf(e.target.value))
          alert('hello world')
          // mark text red, don't allow submission
        }
      }}
      on:keydown={async (e) => {
        if (e.key === 'Enter') {
          const input = e.currentTarget;
          const nostrHandle = input.value;

          const response = await fetch('/create-nip05', {
            method: 'POST',
            body: JSON.stringify({ nostrHandle, pubKey }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          input.value = '';
          const data = await response.json()
          if (data.error) {
            alert(data.error)
          }
          console.log(data)
        }
      }}
    />
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