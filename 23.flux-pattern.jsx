/**
 * Flux pattern for data handling
 */

// Simple dispatcher
var Dispatcher = function () {
  return {
    _stores: [],
    register: function (store) {
      this._stores.push({ store: store });
    },
    dispatch: function (action) {
      if (this._stores.length > 0) {
        this._stores.forEach(function (entry) {
          entry.store.update(action);
        });
      }
    }
  }
};