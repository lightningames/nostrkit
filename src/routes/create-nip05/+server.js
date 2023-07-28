import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export async function POST({ request, cookies }) {
	const { nostrHandle, pubKey } = await request.json();

	const userid = cookies.get('userid');
	// const { id } = await database.createTodo({ userid, description });

  const dir = '.well-known';
  const filePath = path.join(dir, 'nostr.json');

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  let mapping;
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    mapping = JSON.parse(fileContent);
  } else {
    mapping = { names: {} };
  }

  if (mapping.names[nostrHandle]) {
    return json({ error: 'Name already exists' }, { status: 400 });
  }

  for (let key in mapping.names) {
    if (mapping.names[key] === pubKey) {
      return json({ error: 'Public key already exists' }, { status: 400 });
    }
  }

  mapping.names[nostrHandle] = pubKey;

  fs.writeFileSync(filePath, JSON.stringify(mapping));
	return json({ mapping }, { status: 201 });
}