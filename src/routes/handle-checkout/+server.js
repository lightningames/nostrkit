import { json } from '@sveltejs/kit';
import { LNBITS_URL, LNBITS_ADMIN_KEY } from '$env/static/private';

export async function POST({ request, cookies }) {

  const { fee, user } = await request.json()

  const paylinkResponse = await fetch(`${LNBITS_URL}/lnurlp/api/v1/links`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'X-API-KEY': LNBITS_ADMIN_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: `NOSTRKIT Payment from ${user}`,
      min: fee,
      max: fee,
      amount: fee,
      comment_chars: 50,
      success_text: 'Thanks for using NOSTRKIT!',
    }),
  });

  const data = await paylinkResponse.json()

	return json(data);
}

