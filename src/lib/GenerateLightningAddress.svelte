<script>
  /**
   * @type {string}
   */
  export let lightningAddress;

  let username = '';

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
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const metadata = JSON.parse(data.metadata);
      lightningAddress = metadata[1][1];
      console.log(lightningAddress); // This will log "bob22test12345@sats.lnaddy.com"
    } else {
      lightningAddress = `Error: ${response.status}`;
    }
  }
</script>

<div class="input-wrapper">
  <input type="text" bind:value={username} placeholder="Enter username" />
  <span>@sats.lnaddy.com</span>
</div>

<button
  on:click={(e) => generateLightningAddress(e)}
  disabled={lightningAddress ? true : false}>Generate Lightning Address</button
>
{#if lightningAddress}
  <h6>
    Your brand new lightning address! Use this to send and receive bitcoin!
  </h6>
  <p>{lightningAddress}</p>
{/if}

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
