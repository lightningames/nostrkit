import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { LNBITS_URL, LNBITS_API_KEY, LNBITS_ADMIN_KEY, DOMAIN } from '$env/static/private';

export function GET() {
	// const { nostrHandle, pubKey } = await request.json();

	// const userid = cookies.get('userid');
	// // const { id } = await database.createTodo({ userid, description });

  const dir = '.well-known';
  const filePath = path.join(dir, 'nostr.json');

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  let mapping;
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent) {
      mapping = JSON.parse(fileContent);
    } else {
      mapping = { names: {} };
    }
  } else {
    mapping = { names: {} };
  }

  // if (mapping.names[nostrHandle]) {
  //   return json({ error: 'Name already exists' }, { status: 400 });
  // }

  // for (let key in mapping.names) {
  //   if (mapping.names[key] === pubKey) {
  //     return json({ error: 'Public key already exists' }, { status: 400 });
  //   }
  // }

  // mapping.names[nostrHandle] = pubKey;

  fs.writeFileSync(filePath, JSON.stringify(mapping));
	return json({ mapping, domain: DOMAIN }, { status: 201 });
}