import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  // create the user's wallet
  const body = await request.json();
  const { username } = body;
  console.log('this is request', username)
  const newWallet = await fetch('https://sats.lnaddy.com/usermanager/api/v1/users', {
      method: 'POST',
      headers: {
          'X-Api-Key': '1da19ce09c494d45a8cf012b3d131d67',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          admin_id: '93689e9467004b029a3fbf987ed8b06f',
          wallet_name: 'bob-wallet',
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
  const setExtensions = await fetch(`https://sats.lnaddy.com/usermanager/api/v1/extensions?extension=lnurlp&userid=${userId}&active=true`, {
    method: 'POST',
    headers: {
        'X-Api-Key': '1da19ce09c494d45a8cf012b3d131d67',
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

  const createLNURLp = await fetch('https://sats.lnaddy.com/lnurlp/api/v1/links', {
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

const createLightningAddress = await fetch(`https://sats.lnaddy.com/lnurlp/api/v1/well-known/${username}`, {
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

//   curl -X 'POST' \
//   'https://sats.lnaddy.com/lnurlp/api/v1/links' \
//   -H 'accept: application/json' \
//   -H 'X-API-KEY: d700475cd63d4874b3756949cc49bed3' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "description": "string",
//   "min": 1000,
//   "max": 1000,
//   "amount": 1000,
//   "currency": "satoshi",
//   "comment_chars": 10,
//   "success_text": "string",
//   "fiat_base_multiplier": 100,
//   "username": "bob1231blargh",
//   "zaps": true
// }'
}