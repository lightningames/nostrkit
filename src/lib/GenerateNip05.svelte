<script>
  let number;
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
      <input
        bind:this={inputElement}
        type="text"
        autocomplete="off"
        on:input={(e) => {
          if (takenNames.indexOf(e.target.value) > -1) {
            console.log(takenNames.indexOf(e.target.value));
            alert('hello world');
            // mark text red, don't allow submission
          }
        }}
        on:keydown={async (e) => {
          if (e.key === 'Enter') {
            submit();
          }
        }}
      />
      <button on:click={(e) => submit(e)}>Create your NIP-05</button>
    {:else}
      <h4>Great choice! Heres your handle. Press Next to continue</h4>
      <p>{nostrHandle}@nostrkit.plebnet.dev</p>
    {/if}
  </div>
</article>
