<script>
  /**
   * @type {string}
   */
  export let pubKey;
  /**
   * @type {string}
   */
  export let privKey;
  /**
   * @type {string}
   */
  export let lightningAddress;
  /**
   * @type {string}
   */
  export let nostrHandle;

  let hasPaid = false;
</script>

<article>
  <h4>Order Summary:</h4>
  <h5><i>Please pay for your order to receive your NOSTR goodies</i></h5>
  {#if pubKey}
    <h6>
      nPub Key (NOSTR Public Key)
      {#if hasPaid}
        <p>{pubKey}</p>
      {/if}
    </h6>
    <h6>
      nSec Key (NOSTR Private Key)
      {#if hasPaid}
        <p>{privKey}</p>
      {/if}
    </h6>
  {/if}
  <br />
  {#if nostrHandle}
    <h6>
      NIP-05 (NOSTR public handle/username)
      {#if hasPaid}
        <p>{nostrHandle}@nostrkit.plebnet.dev</p>
      {/if}
    </h6>
  {/if}
  <br />
  <p>{nostrHandle}</p>
  {#if lightningAddress}
    <h6>
      Lightning Address (Lightning payments address)
      {#if hasPaid}
        <p>{lightningAddress}</p>
      {/if}
    </h6>
  {/if}
  {#if !hasPaid}
    <!-- create/display pay link to create a pay wall. See plebdev website -->
    <!-- Self/User hosted will probably not have the pay-wall, maybe optional donation field instead. -->
  {/if}
</article>
