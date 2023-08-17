<script>
  import LightningIcon from 'virtual:icons/carbon/lightning';
  /**
   * @type {string}
   */
  export let lightningAddress;
  /**
   * @type {any}
   */
  export let username;

  export let zaps = false;

  /**
   * @type {string}
   */
  export let pubKey;

  /**
   * @type {boolean | undefined}
   */
  let incorrectLightningAddress = undefined;

  /**
   * @param {string} email
   */
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]{2,}(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function handleInputChange() {
    if (!username.length) {
      incorrectLightningAddress = undefined;
      return;
    }
    if (!validateEmail(username)) {
      incorrectLightningAddress = true;
    } else {
      incorrectLightningAddress = false;
    }
  }

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

<div class="header-container">
  <h3 class="nostr-text">Lightning Address Forwarding Service</h3>
  <LightningIcon style="color:#6a359c;" />
</div>
<article>
  <header>
    <p>
      Link your existing Lightning Address to your NIP-05 Identifier. Learn more
      <a
        target="_blank"
        href="https://github.com/andrerfneves/lightning-address/blob/master/README.md"
        >here.</a
      >
      You can also enable
      <a
        target="_blank"
        href="https://github.com/nostr-protocol/nips/blob/master/57.md">Zaps</a
      >, a seamless way to send Sats to users as you would a heart, like, or a
      thumbs-up.
    </p>
  </header>
  <div class="container">
    <div class="input-wrapper">
      <div
        class="input-wrapper {incorrectLightningAddress ? 'show-tooltip' : ''}"
        data-tooltip="Invalid Lightning Address"
        data-placement="bottom"
        style="border:none; padding:0; margin:0; cursor:auto"
      >
        <input
          type="text"
          class={incorrectLightningAddress === undefined
            ? ''
            : incorrectLightningAddress
            ? 'input-error'
            : 'input-success'}
          bind:value={username}
          on:input={handleInputChange}
          placeholder="jack@walletofsatoshi.com"
        />
      </div>
    </div>
    <button
      on:click={(e) => generateLightningAddress(e)}
      disabled={lightningAddress ? true : false}
      >Generate Lightning Address</button
    >
    <!-- <span>@sats.lnaddy.com</span> -->
    <label>
      <input type="checkbox" bind:checked={zaps} />
      Enable Zaps?
    </label>
    {#if lightningAddress}
      <h6>
        Here's your brand lightning address! Use this to send and receive
        bitcoin like you would your lnurlP
      </h6>
      <p>{lightningAddress}</p>
    {/if}
  </div>
</article>

<style>
  .input-wrapper {
    position: relative;
    display: inline-block;
  }

  .input-wrapper input {
    width: 20rem;
  }

  .input-wrapper[data-tooltip]:not([data-tooltip=''])::before,
  .input-wrapper[data-tooltip]:not([data-tooltip=''])::after {
    visibility: hidden;
    opacity: 0;
  }

  .show-tooltip[data-tooltip]:not([data-tooltip=''])::before,
  .show-tooltip[data-tooltip]:not([data-tooltip=''])::after {
    visibility: visible;
    opacity: 1;
    color: red;
    margin-top: -0.9rem;
  }

  .input-error {
    border: 3px solid red !important;
    outline: red !important;
    box-shadow: 0 0 10px red;
  }
  .input-error:focus {
    border: 3px solid red !important;
    outline: red !important;
    box-shadow: 0 0 10px red;
  }
  .input-success {
    border: 3px solid green !important;
    outline: green !important;
    box-shadow: 0 0 10px green;
  }
  .input-success:focus {
    border: 3px solid green !important;
    outline: green !important;
    box-shadow: 0 0 10px green;
  }
  .nostr-text {
    color: #6a359c;
    text-decoration: none;
  }
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0 10px; /* Adjust this value to your liking */
  }
</style>
