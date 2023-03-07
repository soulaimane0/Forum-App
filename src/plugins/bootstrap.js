import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';

export default {
  install: function (app) {
    app.config.globalProperties.$bootstrap = bootstrap;
  },
};
