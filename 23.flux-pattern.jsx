/**
 * Flux pattern for data handling
 */

// Simple dispatcher
var Dispatcher = function () {
  return {
    _stores: [],
    register: function (store) {
      this._stores.push({store: store});
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

// We see the we expect the store to have an update method(), so let's modify register to expect it.
function register(store) {
  if (!store || !store.update && typeof store.update === 'function') {
    throw new Error('You should provide a store that has an updte method');
  } else {
    this._stores.push({store: store});
  }
}
