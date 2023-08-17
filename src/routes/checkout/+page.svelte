<script>
  import { onMount, onDestroy } from 'svelte';
  import { checkoutStore } from '$lib/store.js';
  import DarkModeToggle from '$lib/DarkModeToggle.svelte';
  // @ts-ignore
  import ClipboardIcon from 'virtual:icons/carbon/copy';
  import '@picocss/pico';
  import { goto } from '$app/navigation';
  import CopyableParagraph from '$lib/CopyElement.svelte';

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
  let lightningAddress;
  /**
   * @type {string}
   */
  let nostrHandle;
  /**
   * @type {number}
   */
  let checkoutCost;

  /**
   * @type {string}
   */
  let username;

  /**
   * @type {boolean}
   */
  let zaps;

  /**
   * @type {string}
   */
  let lnbitsAdminKey;

  /**
   * @type {string}
   */
  let domain;

  let copied = false;

  checkoutStore.subscribe((value) => {
    pubKey = value.pubKey;
    privKey = value.privKey;
    lightningAddress = value.lightningAddress;
    nostrHandle = value.inputElement;
    checkoutCost = value.checkoutCost;
    // @ts-ignore
    username = value.username;
    // @ts-ignore
    zaps = value.zaps;
  });

  let hasPaid = false;
  /**
   * @type {any}
   */
  let paylinkLNURL;
  /**
   * @type {any}
   */
  let baseLNbitsURL;

  /**
   * @type {string}
   */
  let qrCode;

  /**
   * @type {any}
   */
  let paylinkID;

  /**
   * @type {number | undefined}
   */
  let intervalId;

  /**
   * @type {string}
   */
  let lnurl;

  async function getQRCode() {
    const response = await fetch(
      // get domain and api key from server
      `${baseLNbitsURL}/api/v1/qrcode/${paylinkLNURL}`,
    );
    let data = await response.text();
    data = data.replace(/stroke="#000"/g, 'stroke="#FF9500"');
    data = data.replace(/scale\(3\)/g, 'scale(3)'); // Increase the scale value to increase the size
    data = data.replace(/<svg/g, '<svg viewBox="0 0 200 200"'); // Add or replace the viewbox attribute
    data = data.replace(/width="[^"]*"/g, 'width="500"');
    data = data.replace(/height="[^"]*"/g, 'height="500"');
    qrCode = data;
  }

  async function getPaylink() {
    const response = await fetch(
      // get domain and api key from server
      `${baseLNbitsURL}/lnurlp/api/v1/links/${paylinkID}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'X-API-KEY': lnbitsAdminKey,
        },
      },
    );

    const data = await response.json();
    if (data.served_pr > 0) {
      hasPaid = true;
      clearInterval(intervalId); // Stop checking
      // updatePaylink();
    }
  }

  async function updatePaylink() {
    const response = await fetch(
      // get domain and api key from server
      `${baseLNbitsURL}/lnurlp/api/v1/links/${paylinkID}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          'X-API-KEY': lnbitsAdminKey,
        },
        body: JSON.stringify({
          description: `NOSTRKIT payment for ${nostrHandle} successful`,
          min: checkoutCost,
          max: checkoutCost,
          amount: checkoutCost,
          // min: 1,
          // max: 1,
          // amount: 1,
          comment_chars: 50,
          success_text: 'Thanks for using NOSTRKIT!',
        }),
      },
    );
    const test = await response.json();
    console.log(test);
  }

  onMount(async () => {
    if (!pubKey || !nostrHandle || !checkoutCost) {
      goto('/');
      return;
    }

    const getEnvVars = await fetch('/get-env', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const envData = await getEnvVars.json();
    baseLNbitsURL = envData.lnbitsURL;
    lnbitsAdminKey = envData.lnbitsAdminKey;
    domain = envData.domain;

    const paylinkResponse = await fetch('/handle-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ fee: checkoutCost, user: nostrHandle }),
      body: JSON.stringify({ fee: 1, user: 'nostrHandle1' }),
    });
    const paylinkData = await paylinkResponse.json();
    console.log('this is payLinkData', paylinkData);
    paylinkLNURL = paylinkData.lnurl;
    paylinkID = paylinkData.id;
    lnurl = paylinkData.lnurl;
    await getQRCode();
    intervalId = setInterval(getPaylink, 3000);
  });

  onDestroy(() => {
    // Clear the interval when the component is destroyed
    clearInterval(intervalId);
  });

  function copyToClipboard() {
    navigator.clipboard
      .writeText(lnurl)
      .then(() => {
        console.log('copied');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000); // hide the tooltip after 2 seconds
  }

  /**
   * @param {number} number
   */
  function formatNumberWithCommas(number) {
    return Number(number).toLocaleString();
  }

  async function getNostrData() {
    const responseNip05 = await fetch('/create-nip05', {
      method: 'POST',
      body: JSON.stringify({ nostrHandle, pubKey }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const dataNip05 = await responseNip05.json();
    console.log('create-nip05 data, ', dataNip05);

    // only create lightning forwarder if user opted in
    if (username) {
      const responseLightningAddress = await fetch(
        '/create-lightning-address',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            zaps: zaps,
            pubKey: zaps ? pubKey : '',
          }),
        },
      );

      if (responseLightningAddress.ok) {
        const dataLightningAddress = await responseLightningAddress.json();
        lightningAddress = dataLightningAddress.message;
        console.log(dataLightningAddress);
      } else {
        lightningAddress = `Error: ${responseLightningAddress.status}`;
      }
    }
  }

  $: if (hasPaid) {
    getNostrData();
  }
</script>

<body>
  <header class="container">
    <nav>
      <ul>
        <li class="vertical-stack">
          <strong><a href="/">NOSTRKIT</a></strong>
          <small>by <a href="https://www.plebnet.dev">PlebNet.dev</a></small>
        </li>
      </ul>
      <ul>
        <li><a href="#">What is NOSTR?</a></li>
        <li><a href="/about">About NOSTRKIT</a></li>
        <li><a href="#">Self Hosting</a></li>
        <DarkModeToggle />
      </ul>
    </nav>
  </header>
  <main class="container">
    <article>
      {#if !hasPaid}
        <div class="input-wrapper">
          <h4 style="color: #FF9500">
            Order Total: {`${formatNumberWithCommas(checkoutCost)} sats`}
          </h4>
          <div class="qr-code-wrapper">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class="no-outline"
              style="margin:auto; padding-right: 10px; cursor: pointer; border: none;"
              id="qrCode"
              bind:innerHTML={qrCode}
              contenteditable
              on:keypress={copyToClipboard}
              on:click={copyToClipboard}
            />
          </div>
          <div class="button-wrapper">
            {#if qrCode}
              <button type="button" on:click={copyToClipboard} class="lnurl">
                <div style="display: flex; justify-content: center;">
                  Copy LNURL<ClipboardIcon style="margin-left: 1rem" />
                </div>
                <span
                  class="tooltip"
                  style="visibility: {copied ? 'visible' : 'hidden'}"
                >
                  <span>Copied!</span>
                </span>
              </button>
            {/if}
          </div>
        </div>
      {/if}
      {#if hasPaid}
        <h4>Order Summary:</h4>
      {/if}
      <h5>
        <i
          >{hasPaid
            ? 'Thanks for your order!'
            : 'Please pay for your order to receive your NOSTR goodies'}</i
        >
      </h5>
      {#if pubKey && hasPaid}
        <h6>
          nPub Key (NOSTR Public Key)
          <CopyableParagraph>{pubKey}</CopyableParagraph>
        </h6>
        {#if privKey}
          <h6>
            nSec Key (NOSTR Private Key)
            <CopyableParagraph>{privKey}</CopyableParagraph>
          </h6>
        {/if}
      {/if}
      <br />
      {#if nostrHandle && hasPaid}
        <h6>
          NIP-05 (NOSTR public handle/username)
          <CopyableParagraph>{nostrHandle}@{domain}</CopyableParagraph>
        </h6>
      {/if}
      {#if username && hasPaid}
        <h6>
          Lightning Address forwarding enabled from:
          <CopyableParagraph>{username}</CopyableParagraph>
        </h6>
      {/if}
      {#if !hasPaid}
        <!-- create/display pay link to create a pay wall. See plebdev website -->
        <!-- Self/User hosted will probably not have the pay-wall, maybe optional donation field instead. -->
      {/if}
    </article>
  </main>
</body>

<style>
  .vertical-stack {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  .qr-code-wrapper {
    display: flex;
    margin-left: 8rem;
  }
  .button-wrapper {
    display: flex;
    margin: auto;
    justify-content: center;
  }
  .no-outline:focus {
    border: none;
    outline: none;
  }
  h6,
  i {
    color: #6a359c;
  }
  .lnurl {
    position: relative;
  }
  .tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #6a359c;
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
  }
  a {
    color: #6a359c;
  }
</style>
