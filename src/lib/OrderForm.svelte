<script>
  import GenerateKeys from '$lib/GenerateKeys.svelte';
  import GenerateNip05 from '$lib/GenerateNip05.svelte';
  import GenerateLightningAddress from './GenerateLightningAddress.svelte';
  import { onMount } from 'svelte';
  // @ts-ignore
  import MoneyIcon from 'virtual:icons/game-icons/take-my-money';
  import { checkoutStore } from '$lib/store.js';

  $: {
    checkoutStore.update(() => ({
      pubKey,
      privKey,
      lightningAddress,
      inputElement,
      checkoutCost,
      username,
      zaps,
    }));
  }

  /**
   * @type {any}
   */
  let zaps;

  let keys;

  /**
   * @type {any}
   */
  let inputElement;

  /**
   * @type {any}
   */
  let username;

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
   * @type {string}
   */
  let pubKey;
  /**
   * @type {string}
   */
  let privKey;

  /**
   * @type {any}
   */
  let userProvidedPubKey;

  /**
   * @type {string[]}
   */
  let takenNames = [];

  onMount(async () => {
    const response = await fetch('/get-nip05');
    const data = await response.json();
    // console.log('this is data on mount\n', data);
    const chosenNames = data.mapping.names;
    for (let takenName in chosenNames) {
      takenNames.push(takenName);
    }
    // console.log(data);
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

  // @ts-ignore
  async function getKeys(e) {
    e.preventDefault();
    const response = await fetch('/get-keys');
    keys = await response.json();
    pubKey = keys.pk;
    privKey = keys.sk;
    // modal toggle that says "warning! Save these keys in a safe place. You won't see your private key after leaving this page or refreshing your browser"
    keysGen = true;
  }
  function calculateCheckoutCost() {
    let total = 0;
    if (inputElement) {
      if (inputElement.length === 2) {
        total += 10000;
      }
      if (inputElement.length === 3) {
        total += 7500;
      }
      if (inputElement.length > 3) {
        total += 5000;
      }
    }
    if (username) {
      let usernameParts = username.split('@');
      let usernameFirstPart = usernameParts[0];

      if (usernameFirstPart.length === 2) {
        total += 10000;
      }
      if (usernameFirstPart.length === 3) {
        total += 7500;
      }
      if (usernameFirstPart.length > 3) {
        total += 5000;
      }
    }
    return total;
  }

  let checkoutCost = 0;

  $: {
    if (username || inputElement) {
      console.log(username);
      checkoutCost = calculateCheckoutCost();
    }
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
    <GenerateKeys
      {pubKey}
      {privKey}
      {getKeys}
      {keysGen}
      bind:userProvidedPubKey
    />
    <GenerateNip05
      {pubKey}
      {takenNames}
      bind:inputElement
      bind:userProvidedPubKey
      {domain}
      bind:nostrHandle
    />
    <GenerateLightningAddress
      bind:username
      bind:zaps
      {pubKey}
      bind:lightningAddress
    />

    <!-- Display Checkout component -->
    <div class="checkout-page">
      {#if (pubKey || userProvidedPubKey) && (inputElement || username)}
        <h2 style="color:#FF9900">
          Total: {checkoutCost} sats <MoneyIcon style="color:green" />
        </h2>
        <a href="/checkout" style="color:white" role="button">Checkout</a>
      {/if}
    </div>
  </form>
</article>

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
