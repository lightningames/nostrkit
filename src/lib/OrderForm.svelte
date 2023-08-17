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
        total += 40000;
      }
      if (inputElement.length === 3) {
        total += 25000;
      }
      if (inputElement.length === 4) {
        total += 10000;
      }
      if (inputElement.length > 4) {
        total += 5000;
      }
    }
    // if (username) {
    //   let usernameParts = username.split('@');
    //   let usernameFirstPart = usernameParts[0];

    //   if (usernameFirstPart.length === 2) {
    //     total += 10000;
    //   }
    //   if (usernameFirstPart.length === 3) {
    //     total += 7500;
    //   }
    //   if (usernameFirstPart.length > 3) {
    //     total += 5000;
    //   }
    // }
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
