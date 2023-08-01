<script>
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

  function togglePrivKey(e) {
    e.preventDefault();
    showPrivKey = !showPrivKey;
  }
</script>

<article>
  <header>
    <p>
      Generate your NOSTR npub and nsec keys. Keep these safe! You won't be
      shown your private key again.
    </p>
  </header>
  <!-- {console.log('this is keysGen:', keysGen)} -->
  {#if !keysGen}
    <button id="nostr-form" on:click={(e) => getKeys(e)}
      >Generate your keys!
    </button>
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
