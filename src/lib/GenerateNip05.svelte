<script>
  let number;
  /**
   * @type {string}
   */
  export let pubKey;

  /**
   * @type {string[]}
   */
  let takenNames = [];
</script>

<div class="container">
  <h3>Make your own NIP-05</h3>
  <input
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
        const input = e.currentTarget;
        const nostrHandle = input.value;

        const response = await fetch('/create-nip05', {
          method: 'POST',
          body: JSON.stringify({ nostrHandle, pubKey }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        input.value = '';
        const data = await response.json();
        if (data.error) {
          alert(data.error);
        }
        console.log(data);
      }
    }}
  />
</div>
