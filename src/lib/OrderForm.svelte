<script>
  import KeysIcon from 'virtual:icons/game-icons/house-keys';
  import AddressIcon from 'virtual:icons/entypo/email';
  import LightningIcon from 'virtual:icons/carbon/lightning';
  let step = 0;
  let selectedProducts = [];
  const products = [
    {
      id: 1,
      name: 'npub/nsec key',
      description: 'Create your own public and secret keys to access NOSTR.',
      price: 0,
    },
    {
      id: 2,
      name: 'nip-05 address',
      description: 'Create a custom NIP-05 address',
      price: 500,
    },
    {
      id: 3,
      name: 'lightning address',
      description: 'Create an email-like identifier to send/receive BTC',
      price: 1000,
    },
  ];

  function toggleProduct(id) {
    if (selectedProducts.includes(id)) {
      selectedProducts = selectedProducts.filter((product) => product !== id);
    } else {
      selectedProducts.push(id);
    }
  }
</script>

<KeysIcon style="font-size:2em" />
<article>
  <form class="order-form">
    <h2>Start your Order</h2>
    {#if step === 0}
      <div class="product-cards">
        {#each products as product (product.id)}
          <article>
            <header>
              <h3>
                {product.name}
                <KeysIcon style="font-size:2em" />
                <AddressIcon style="font-size:2em" />
                <LightningIcon style="font-size:2rem" />
              </h3>
            </header>
            {product.description}

            <footer>
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                on:change={() => toggleProduct(product.id)}
              />
            </footer>
          </article>
        {/each}
      </div>
      <button on:click={() => step++}>Next</button>
    {:else if step <= selectedProducts.length}
      <div class="product-page">
        <h2>
          {products.find((product) => product.id === selectedProducts[step - 1])
            .name} Page
        </h2>
        <!-- Add form fields for each product here -->
      </div>
      <button on:click={() => step++}>Next</button>
    {:else}
      <div class="checkout-page">
        <h2>Checkout</h2>
        <!-- Add checkout form fields here -->
      </div>
    {/if}
  </form>
</article>

<style>
  .product-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }

  .product-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1rem;
    text-align: center;
  }

  .product-card h2 {
    margin-bottom: 1rem;
  }

  .product-card input[type='checkbox'] {
    display: inline-block;
    margin-top: 1rem;
  }

  h3 {
    color: #6a359c;
  }
</style>
