// Import the Font Awesome core
import { library } from '@fortawesome/fontawesome-svg-core';
// Import Font Awesome Component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// Import specific icons
import {
  faPencil,
  faUser,
  faUsers,
  faComments,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
// import { faComments, faComment } from '@fortawesome/free-regular-svg-icons';
// Add Icon to the library

library.add(faPencil, faGoogle, faUser, faUsers, faComments, faComment);

export default (app) => {
  app.component('fa', FontAwesomeIcon);
};
