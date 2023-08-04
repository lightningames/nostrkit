import { json } from '@sveltejs/kit';
import { LNBITS_URL, LNBITS_API_KEY, LNBITS_ADMIN_KEY } from '$env/static/private';

export async function POST({ request }) {
  // create the user's wallet
  const body = await request.json();
  const { username } = body;
  console.log('this is request', username)
  const newWallet = await fetch(`${LNBITS_URL}/usermanager/api/v1/users`, {
      method: 'POST',
      headers: {
          'X-Api-Key': LNBITS_API_KEY,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          admin_id: LNBITS_ADMIN_KEY,
          wallet_name: `${username}-wallet`,
          user_name: username,
          email: '',
          password: ''
      })
  });

  let data;

  if (newWallet.ok) {
      data = await newWallet.json();
      console.log('this is newWallet response', data)
      // return json(data)
  } else {
      return json({status: newWallet.status, body: await newWallet.text()});
  }

  let userId = data.id;
  let userAdminKey = data.wallets[0].adminkey

  // Allow lnurlP extension
  const setExtensions = await fetch(`${LNBITS_URL}/usermanager/api/v1/extensions?extension=lnurlp&userid=${userId}&active=true`, {
    method: 'POST',
    headers: {
        'X-Api-Key': LNBITS_API_KEY,
        'Content-Type': 'application/json'
    }
  })

  let extensionResponse;

  if (setExtensions.ok) {
    extensionResponse = await setExtensions.json();
    console.log('this is extensionResponse', extensionResponse)
    // return json(extensionResponse)
  } else {
      return json({status: setExtensions.status, body: await setExtensions.text()});
  }

  let lnurlpData;

  //create lnurlP for the user's wallet
  const createLNURLp = await fetch(`${LNBITS_URL}/lnurlp/api/v1/links`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'X-Api-Key': userAdminKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: 'string',
      min: 100,
      max: 100000000,
      currency: 'satoshi',
      comment_chars: 10,
      success_text: 'string',
      username: username,
      zaps: true
  })
});

if (createLNURLp.ok) {
  lnurlpData = await createLNURLp.json();
  console.log('this is lnurlp data', lnurlpData);
  // return json(lnurlpData)
} else {
  console.error(`Error: ${createLNURLp.status}`);
  return json({status: createLNURLp.status, body: await createLNURLp.text()});
}

let lightningAddress;

let selectedName = lnurlpData.username

//retrieve the user's lightning address
const createLightningAddress = await fetch(`${LNBITS_URL}/lnurlp/api/v1/well-known/${username}`, {
  method: 'GET',
  headers: {
    'accept': 'application/json'
  }
})

if (createLightningAddress.ok) {
  lightningAddress = await createLightningAddress.json()
  console.log('this is lightning address data', lightningAddress)
  return json(lightningAddress)
} else {
  console.error(`Error: ${createLightningAddress.status}`)
  return json({status: createLightningAddress.status, body: await createLightningAddress.text()})
}
}