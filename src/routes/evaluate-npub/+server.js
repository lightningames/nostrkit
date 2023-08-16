import { json } from '@sveltejs/kit';
import bech32 from 'bech32';
import crypto from 'crypto';
import { nip19 } from 'nostr-tools'

function isValidNpub(npub) {
  if (typeof npub !== 'string') {
      return false;
  }

  if (npub.startsWith('npub')) {
      try {
          const decoded = nip19.decode(npub)
          console.log(decoded)
          let response = decoded.type === 'npub' && decoded.data.length === 64;
          if (response) {
            return {valid: true, npub: decoded.data}
          }
      } catch (e) {
          return {valid: false, npub: '' };
      }
  } else if (/^[0-9a-fA-F]{64}$/.test(npub)) {
      return { valid: true, npub };
  }

  return { valid: false, npub };
}


export async function POST({ request, cookies }) {

  const { userProvidedPubKey } = await request.json();

  let result = isValidNpub(userProvidedPubKey)

  return json(result);
}