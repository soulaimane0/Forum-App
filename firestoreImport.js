import { initializeFirebaseApp, restore } from 'firestore-export-import';
import serviceAccount from './serviceAccount.json' assert { type: 'json' };
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempFileName = path.join(__dirname, '/data-temp.json');

// procedure
(async () => {
  const fileContents = await fs.readFile(path.join(__dirname, '/src/data.json'), 'utf8');
  const data = JSON.parse(fileContents);
  const transformed = transformDataForFirestore(data);
  await fs.writeFile(tempFileName, JSON.stringify(transformed));
  await jsonToFirestore();
  await fs.unlink(tempFileName);
})();

// JSON To Firestore
async function jsonToFirestore() {
  try {
    console.log('Initializing Firebase');
    await initializeFirebaseApp(serviceAccount);
    console.log('Firebase Initialized');

    await restore(tempFileName);
    console.log('Upload Success');
  } catch (error) {
    console.log(error);
  }
}

// In order to preserve ids in data.json
// as ids in firestore
// must use keyed object (id being the key) instead of array of records
function transformDataForFirestore(data) {
  const collections = data;
  delete collections.stats;
  const collectionsById = {};
  Object.keys(collections).forEach((collectionKey) => {
    collectionsById[collectionKey] = {};
    const collection = collections[collectionKey];
    collection.forEach((record) => {
      collectionsById[collectionKey][record.id] = record;
      delete collectionsById[collectionKey][record.id].id;
    });
  });
  return collectionsById;
}
