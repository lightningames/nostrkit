<script>
  /**
   * @type {string}
   */
  export let lightningAddress;

  let username = '';

  let zaps = false;

  /**
   * @type {string}
   */
  export let pubKey;

  /**
   * @param {MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }} e
   */
  async function generateLightningAddress(e) {
    e.preventDefault();
    const response = await fetch('/create-lightning-address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        zaps: zaps,
        pubKey: zaps ? pubKey : '',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      lightningAddress = data.message;
      console.log(data); // This will log "bob22test12345@sats.lnaddy.com"
    } else {
      lightningAddress = `Error: ${response.status}`;
    }
  }
</script>

<h3>Create your Lightning Address</h3>
<article>
  <header>
    <p>
      Create an email-like identifier that's tethered to your lightning address.
    </p>
  </header>
  <div class="input-wrapper">
    <input type="text" bind:value={username} placeholder="Enter username" />
    <span>@sats.lnaddy.com</span>
  </div>
  <label>
    <input type="checkbox" bind:checked={zaps} />
    Enable Zaps?
  </label>
  <button
    on:click={(e) => generateLightningAddress(e)}
    disabled={lightningAddress ? true : false}
    >Generate Lightning Address</button
  >
  {#if lightningAddress}
    <h6>
      Here's your brand lightning address! Use this to send and receive bitcoin
      like you would your lnurlP
    </h6>
    <p>{lightningAddress}</p>
  {/if}
</article>

<style>
  .input-wrapper {
    position: relative;
    display: inline-block;
  }

  .input-wrapper input {
    padding-right: 120px; /* Adjust based on the size of the text */
    width: 30rem;
  }

  .input-wrapper span {
    position: absolute;
    right: 10px;
    top: 39%;
    transform: translateY(-50%);
    pointer-events: none;
  }
</style>
