import { initializeApp } from 'firebase/app';
import firebaseConfig from '@/config/firebaseConfig.js';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
