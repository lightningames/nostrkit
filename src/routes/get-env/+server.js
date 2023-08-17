import { LNBITS_URL, LNBITS_ADMIN_KEY, DOMAIN } from '$env/static/private';
import { json } from '@sveltejs/kit';

export function GET() {
	const envVars = { lnbitsURL: LNBITS_URL, lnbitsAdminKey: LNBITS_ADMIN_KEY, domain: DOMAIN }

  // the import above eliminated the code below:

	// return new Response(number, {
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	}
	// });

  return json(envVars);
}