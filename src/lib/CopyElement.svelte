<script>
  // @ts-ignore
  import ClipboardIcon from 'virtual:icons/carbon/copy';
  let p;
  let showTooltip = false;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(p.textContent);
      buttonClicked();
      setTimeout(() => {
        tooltipClose();
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
  function buttonClicked() {
    showTooltip = true;
    console.log(showTooltip);
  }

  function tooltipClose() {
    showTooltip = false;
    console.log(showTooltip);
  }
</script>

<div class="copyable-paragraph">
  <p bind:this={p}>
    <slot />
    <button on:click={copyToClipboard} class="copy-button">Copy</button>
  </p>
  <span
    class="tooltip"
    style="visibility: {showTooltip ? 'visible' : 'hidden'}"
  >
    <span>Copied!</span>
  </span>
</div>

<style>
  .copyable-paragraph {
    position: relative;
    display: inline-block;
  }

  .copy-button {
    font-size: 50%; /* 50% of its current size */
    position: relative; /* Position relative to the p element */
    vertical-align: calc(30%); /* Align vertically with the p element */
    margin-left: 10px; /* Add some space between the text and the button */
    padding: 2px 5px 2px 5px;
  }

  .tooltip {
    width: 80px;
    background-color: #6a359c;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 75%;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    bottom: 100%; /* Position above the button */
    right: -3%; /* Align with the right side of the button */
    z-index: 1;
  }
</style>
