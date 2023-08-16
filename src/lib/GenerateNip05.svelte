<script>
  let number;

  let unavailableName = false;

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
   * @type {{ value: string; }}
   */
  let inputElement;

  let addressCreated = false;

  /**
   * @type {string}
   */
  export let nostrHandle;

  /**
   * @param {(MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) | undefined} [e]
   */
  async function submit(e) {
    e.preventDefault();
    nostrHandle = inputElement.value;
    console.log('this is input', inputElement);
    console.log('this is nostrhandle', nostrHandle);
    const response = await fetch('/create-nip05', {
      method: 'POST',
      body: JSON.stringify({ nostrHandle, pubKey }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    inputElement.value = '';
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    }
    console.log(data);
    addressCreated = true;
  }
</script>

<h3>Create your NIP-05</h3>
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
          style="border:none; padding:0; margin:0;"
        >
          <input
            bind:this={inputElement}
            type="text"
            autocomplete="off"
            class={unavailableName ? 'input-error' : ''}
            on:input={(e) => {
              if (takenNames.indexOf(e.target.value) > -1) {
                console.log(takenNames.indexOf(e.target.value));
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
      <button on:click={(e) => submit(e)}>Create your NIP-05</button>
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
    width: 30rem;
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
</style>
