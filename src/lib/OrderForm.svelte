<script>
  import KeysIcon from 'virtual:icons/game-icons/house-keys';
  import AddressIcon from 'virtual:icons/entypo/email';
  import LightningIcon from 'virtual:icons/carbon/lightning';
  import GenerateKeys from '$lib/GenerateKeys.svelte';
  import GenerateNip05 from '$lib/GenerateNip05.svelte';
  import GenerateLightningAddress from './GenerateLightningAddress.svelte';
  import Checkout from './Checkout.svelte';
  import { onMount } from 'svelte';

  let keys;

  /**
   * @type {string}
   */
  let domain;

  let nostrHandle = '';

  let lightningAddress = '';

  let keysGen = false;

  let step = 0;
  /**
   * @type {any[]}
   */
  let selectedProducts = [];
  /**
   * @type {any[]}
   */
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
  /**
   * @type {string}
   */
  let pubKey;
  /**
   * @type {string}
   */
  let privKey;

  /**
   * @type {string}
   */
  let userProvidedPubKey;

  /**
   * @type {string[]}
   */
  let takenNames = [];

  onMount(async () => {
    const response = await fetch('/get-nip05');
    const data = await response.json();
    console.log('this is data on mount\n', data);
    const chosenNames = data.mapping.names;
    for (let takenName in chosenNames) {
      takenNames.push(takenName);
    }
    console.log(data);
    domain = data.domain;
    // console.log('this is takenNames\n', takenNames);
  });

  /**
   * @param {number} id
   */
  function toggleProduct(id) {
    if (selectedProducts.includes(id)) {
      selectedProducts = selectedProducts.filter((product) => product !== id);
    } else {
      selectedProducts = [...selectedProducts, id];
    }
  }

  async function getKeys(e) {
    e.preventDefault();
    const response = await fetch('/get-keys');
    keys = await response.json();
    pubKey = keys.pk;
    privKey = keys.sk;
    // modal toggle that says "warning! Save these keys in a safe place. You won't see your private key after leaving this page or refreshing your browser"
    keysGen = true;
  }
</script>

<article>
  <form class="order-form">
    <h2>Start your Order</h2>
    <!-- <div class="product-cards">
      {#each products as product (product.id)}
        <article>
          <header>
            <h3 style="white-space: nowrap;">
              {product.name}
              {#if product.id === 1}
                <KeysIcon style="font-size:1em" />
              {/if}
              {#if product.id === 2}
                <AddressIcon style="font-size:1em" />
              {/if}
              {#if product.id === 3}
                <LightningIcon style="font-size:1rem" />
              {/if}
            </h3>
          </header>
          {product.description}

          <footer>
            <div
              style="display:flex; align-items: center; justify-content: center;"
            >
              <input
                id="product"
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                on:change={() => toggleProduct(product.id)}
              />
              <p style="align-items: center; margin-top:0.8rem;">Add to Cart</p>
            </div>
          </footer>
        </article>
      {/each}
    </div> -->

    <!-- Display all Generate components at once -->
    <GenerateKeys {pubKey} {privKey} {getKeys} {keysGen} {userProvidedPubKey} />
    <GenerateNip05 {pubKey} {takenNames} {domain} bind:nostrHandle />
    <GenerateLightningAddress {pubKey} bind:lightningAddress />

    <!-- Display Checkout component -->
    <div class="checkout-page">
      <h2>Checkout</h2>
      <!-- TODO: NEED TO PASS PUBKEY AND USERPROVIDED PUBKEY AND EVALUATE -->
      <Checkout {pubKey} {privKey} {lightningAddress} {nostrHandle} />
    </div>
  </form>
</article>

<!-- to do:

0. add paywall using lnbits api for our wallet.

1. move generate logic behind paywall. this logic is currently in front of paywall

2. need to fix how lightning address works (see example website bitkarrot provided)

3. clean up checkout display. -->

<style>
  .product-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  h3 {
    color: #6a359c;
  }
</style>
