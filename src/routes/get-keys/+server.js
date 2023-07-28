import { json } from '@sveltejs/kit';
import { generatePrivateKey, getPublicKey } from 'nostr-tools'

export function GET() {
  let sk = generatePrivateKey() // `sk` is a hex string
  let pk = getPublicKey(sk) // `pk` is a hex string
	const number = {sk, pk}

  // the import above eliminated the code below:

	// return new Response(number, {
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	}
	// });

  return json(number);
}