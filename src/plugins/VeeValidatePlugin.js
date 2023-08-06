import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import { db } from '@/helpers/firestore.js';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default (app) => {
  defineRule('required', required);
  defineRule('email', email);
  defineRule('min', min);
  defineRule('unique', async (value, args) => {
    let group, field;
    if (Array.isArray(args)) {
      [group, field] = args;
    } else {
      ({ group, field } = args);
    }

    const userRef = collection(db, group);
    const q = query(userRef, where(field, '==', value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  });

  configure({
    generateMessage: localize('en', {
      messages: {
        required: '{field} is required',
        email: '{field} must be a valid email',
        min: '{field} must be 0:{min} characters long',
        unique: '{field} is already taken',
      },
    }),
  });

  app.component('VeeForm', Form);
  app.component('VeeField', Field);
  app.component('VeeErrorMessage', ErrorMessage);
};
