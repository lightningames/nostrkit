<script>
  import KeysIcon from 'virtual:icons/game-icons/house-keys';

  /**
   * @type {string}
   */
  export let pubKey;
  /**
   * @type {boolean}
   */

  let showPrivKey = false;

  /**
   * @type {boolean}
   */
  export let keysGen;

  /**
   * @type {string}
   */
  export let privKey;

  /**
   * @type {function}
   */
  export let getKeys;

  /**
   * @type {string}
   */
  export let userProvidedPubKey;

  let showInput = false;
  let userInput = '';
  let inputColor = 'black';
  let invalidKey = undefined;

  async function checkValidity() {
    const res = await fetch('/evaluate-npub', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userProvidedPubKey }),
    });
    const data = await res.json();
    console.log(data);
    invalidKey = true;
    inputColor = data.valid ? 'black' : 'red';
    if (data.valid) {
      userProvidedPubKey = data.npub;
      invalidKey = false;
    }
  }

  function togglePrivKey(e) {
    e.preventDefault();
    showPrivKey = !showPrivKey;
  }

  function toggleInput(e) {
    e.preventDefault();
    showInput = !showInput;
    userInput = '';
    userProvidedPubKey = '';
    invalidKey = undefined;
  }
</script>

<div class="header-container">
  <h3 class="nostr-text">Create your NOSTR npub/nsec</h3>
  <KeysIcon style="color:#6a359c;" />
</div>
<article>
  <header>
    <p>
      Generate your NOSTR npub and nsec keys or provide your own. Keep these
      safe! You won't be shown your private key again.
    </p>
  </header>
  {#if !keysGen && !showInput}
    <button id="nostr-form" on:click={(e) => getKeys(e)}
      >Generate your keys!
    </button>
    <button id="provide-npub" on:click={(e) => toggleInput(e)}
      >Provide your own npub
    </button>
  {/if}
  {#if showInput}
    <div
      class="input-wrapper {invalidKey ? 'show-tooltip' : ''}"
      data-tooltip="Invalid npub"
      data-placement="bottom"
      style="border:none; padding:0; margin:0; cursor:auto"
    >
      <input
        type="text"
        class={invalidKey === undefined
          ? ''
          : invalidKey
          ? 'input-error'
          : 'input-success'}
        bind:value={userProvidedPubKey}
        placeholder="Enter your npub"
        on:input={checkValidity}
        style="color: {inputColor};"
      />
    </div>
    <button id="back-button" on:click={(e) => toggleInput(e)}>Back </button>
  {/if}
  <div class="container">
    <p>{pubKey ? `Public Key: ${pubKey}` : ''}</p>
  </div>
  <div class="container">
    <p>
      {privKey ? `Private Key: ${showPrivKey ? privKey : '**********'}` : ''}
    </p>
    {#if privKey}
      <button on:click={(e) => togglePrivKey(e)}
        >{showPrivKey ? 'Hide' : 'Show'} Private Key</button
      >
    {/if}
  </div>
</article>

<style>
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
