import { json } from '@sveltejs/kit';
import { LNBITS_URL, LNBITS_API_KEY, LNBITS_ADMIN_KEY, DOMAIN } from '$env/static/private';
import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

function parseLightningAddress(username) {

  // Construct the LNURL Pay request URL
  let lnurlP = `https://${DOMAIN}/.well-known/lnurlp/${username}`;

  return lnurlP;
}


export async function POST({ request }) {
  try {
  // Need to have separate API route that adds the user's npub and allowsNostr:true to enable zaps.

  // {"callback":"https://livingroomofsatoshi.com/api/v1/lnurl/payreq/ac24928e-a3e4-4969-bd43-fa8133e02ca3","maxSendable":100000000000,"minSendable":1000,"metadata":"[[\"text/plain\",\"Pay to Wallet of Satoshi user: scarredsofa23\"],[\"text/identifier\",\"scarredsofa23@walletofsatoshi.com\"]]","commentAllowed":32,"tag":"payRequest","allowsNostr":true,"nostrPubkey":"be1d89794bf92de5dd64c1e60f6a2c70c140abac9932418fee30c5c637fe9479"}

  const body = await request.json();
  const { username, zaps, pubKey } = body;
  console.log('this is request', username)
  const lnurlPayRequest = parseLightningAddress(username);

  // const response = await fetch(lnurlPayRequest);
  // testing with EzoFox's lnurlP
  const response = await fetch('https://walletofsatoshi.com/.well-known/lnurlp/scarredsofa23')
  if (!response.ok) {
    throw new Error(`Fetch failed with status: ${response.status}`);
  }

  let data = await response.json();

      // Add the additional fields if zaps is true
      if (zaps) {
        data = {
          ...data,
          allowsNostr: true,
          nostrPubkey: pubKey
        };
      }

  // Create the new file
  const filePath = `.well-known/lnurlp/${username}.json`;
  if (!fs.existsSync(filePath)) {
    await writeFile(filePath, '');
  }
  await writeFile(filePath, JSON.stringify(data));

  return json({ message: 'Lightning address created' });
} catch (error) {
  console.error(error);
  return json({ message: 'An error occurred' }, { status: 500 });



//   const newWallet = await fetch(`${LNBITS_URL}/usermanager/api/v1/users`, {
//       method: 'POST',
//       headers: {
//           'X-Api-Key': LNBITS_API_KEY,
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//           admin_id: LNBITS_ADMIN_KEY,
//           wallet_name: `${username}-wallet`,
//           user_name: username,
//           email: '',
//           password: ''
//       })
//   });

//   let data;

//   if (newWallet.ok) {
//       data = await newWallet.json();
//       console.log('this is newWallet response', data)
//       // return json(data)
//   } else {
//       return json({status: newWallet.status, body: await newWallet.text()});
//   }

//   let userId = data.id;
//   let userAdminKey = data.wallets[0].adminkey

//   // Allow lnurlP extension
//   const setExtensions = await fetch(`${LNBITS_URL}/usermanager/api/v1/extensions?extension=lnurlp&userid=${userId}&active=true`, {
//     method: 'POST',
//     headers: {
//         'X-Api-Key': LNBITS_API_KEY,
//         'Content-Type': 'application/json'
//     }
//   })

//   let extensionResponse;

//   if (setExtensions.ok) {
//     extensionResponse = await setExtensions.json();
//     console.log('this is extensionResponse', extensionResponse)
//     // return json(extensionResponse)
//   } else {
//       return json({status: setExtensions.status, body: await setExtensions.text()});
//   }

//   let lnurlpData;

//   //create lnurlP for the user's wallet
//   const createLNURLp = await fetch(`${LNBITS_URL}/lnurlp/api/v1/links`, {
//     method: 'POST',
//     headers: {
//       'accept': 'application/json',
//       'X-Api-Key': userAdminKey,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       description: 'string',
//       min: 100,
//       max: 100000000,
//       currency: 'satoshi',
//       comment_chars: 10,
//       success_text: 'string',
//       username: username,
//       zaps: true
//   })
// });

// if (createLNURLp.ok) {
//   lnurlpData = await createLNURLp.json();
//   console.log('this is lnurlp data', lnurlpData);
//   // return json(lnurlpData)
// } else {
//   console.error(`Error: ${createLNURLp.status}`);
//   return json({status: createLNURLp.status, body: await createLNURLp.text()});
// }

// let lightningAddress;

// let selectedName = lnurlpData.username

// //retrieve the user's lightning address
// const createLightningAddress = await fetch(`${LNBITS_URL}/lnurlp/api/v1/well-known/${username}`, {
//   method: 'GET',
//   headers: {
//     'accept': 'application/json'
//   }
// })

// if (createLightningAddress.ok) {
//   lightningAddress = await createLightningAddress.json()
//   console.log('this is lightning address data', lightningAddress)
//   return json(lightningAddress)
// } else {
//   console.error(`Error: ${createLightningAddress.status}`)
//   return json({status: createLightningAddress.status, body: await createLightningAddress.text()})
// }

}
}