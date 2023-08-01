<script>
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

  let keysGen = false;

  async function getKeys(e) {
    e.preventDefault();
    const response = await fetch('/get-keys');
    number = await response.json();
    pubKey = number.pk;
    privKey = number.sk;
    // modal toggle that says "warning! Save these keys in a safe place. You won't see your private key after leaving this page or refreshing your browser"
    keysGen = true;
  }

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
  {#if !keysGen}
    <button id="nostr-form" on:click={(e) => getKeys(e)}
      >Generate your keys!</button
    >
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
