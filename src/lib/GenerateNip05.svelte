<script>
  import AddressIcon from 'virtual:icons/entypo/email';

  /**
   * @type {boolean | undefined}
   */
  let unavailableName = undefined;

  /**
   * @type {string}
   */
  export let domain;

  /**
   * @type {string}
   */
  export let pubKey;

  /**
   * @type {string[]}
   */
  export let takenNames = [];

  /**
   * @type {any}
   */
  export let inputElement;

  let addressCreated = false;

  /**
   * @type {string}
   */
  export let nostrHandle;

  /**
   * @type {any}
   */
  export let userProvidedPubKey;

  /**
   * @param {(MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) | undefined} [e]
   */
  async function submit(e) {
    e.preventDefault();
    nostrHandle = inputElement;
    console.log('userprovidedkey: ', userProvidedPubKey);
    pubKey = pubKey || userProvidedPubKey;
    const response = await fetch('/create-nip05', {
      method: 'POST',
      body: JSON.stringify({ nostrHandle, pubKey }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    inputElement = '';
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    }
    console.log(data);
    addressCreated = true;
  }
</script>

<div class="header-container">
  <h3 class="nostr-text">Create your NIP-05</h3>
  <AddressIcon style="color:#6a359c;" />
</div>
<article>
  <header>
    <p>
      Create an email-like identifier that's tethered to your lightning address.
    </p>
  </header>
  <div class="container">
    {#if !addressCreated}
      <div class="input-wrapper">
        <div
          class="input-wrapper {unavailableName ? 'show-tooltip' : ''}"
          data-tooltip="This name is unavailable"
          data-placement="bottom"
          style="border:none; padding:0; margin:0; cursor:auto"
        >
          <input
            bind:value={inputElement}
            type="text"
            autocomplete="off"
            placeholder="jackdorsey"
            class={unavailableName === undefined
              ? ''
              : unavailableName
              ? 'input-error'
              : 'input-success'}
            on:input={(e) => {
              if (!e.target.value.length) {
                unavailableName = undefined;
                return;
              }
              if (
                takenNames.indexOf(e.target.value) > -1 ||
                e.target.value.length < 2
              ) {
                unavailableName = true;
              } else {
                unavailableName = false;
              }
              console.log(unavailableName);
            }}
            on:keydown={async (e) => {
              if (e.key === 'Enter') {
                submit();
              }
            }}
          />
          <span>@{domain}</span>
        </div>
      </div>
      <!-- <button on:click={(e) => submit(e)}>Create your NIP-05</button> -->
    {:else}
      <h4>Great choice! Heres your handle. Press Next to continue</h4>
      <p>{nostrHandle}@{domain}</p>
    {/if}
  </div>
</article>

<style>
  .input-wrapper {
    position: relative;
    display: inline-block;
  }

  .input-wrapper input {
    padding-right: 120px; /* Adjust based on the size of the text */
    width: 20rem;
  }

  .input-wrapper span {
    position: absolute;
    right: 10px;
    top: 39%;
    transform: translateY(-50%);
    pointer-events: none;
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

  /* .header-container h3,
  .header-container svg {
    color: #6a359c;
  } */
</style>
