import { writable } from 'svelte/store';

export const checkoutStore = writable({
  pubKey: '',
  privKey: '',
  lightningAddress: '',
  inputElement: '',
  checkoutCost: 0,
});