// Import the Font Awesome core
import { library } from '@fortawesome/fontawesome-svg-core';
// Import Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// Import specific icons
import { faPencil } from '@fortawesome/free-solid-svg-icons';
// Add Icon to the library

library.add(faPencil);

export default (app) => {
  app.component('fa', FontAwesomeIcon);
};
