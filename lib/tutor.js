(function() {
  var gatherer, name, tutor, _i, _len, _ref;

  gatherer = require('./gatherer');

  tutor = module.exports;

  _ref = ['formats', 'set', 'sets', 'types'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    name = _ref[_i];
    tutor[name] = gatherer[name];
  }

  tutor.card = function(details, callback) {
    var card, get, languages, legality;
    switch (typeof details) {
      case 'number':
        details = {
          id: details
        };
        break;
      case 'string':
        details = {
          name: details
        };
    }
    card = languages = legality = null;
    get = function(success) {
      return function(err, data) {
        if (err) {
          callback(err);
          callback = function() {};
          return;
        }
        success(data);
        if ((card != null) && (languages != null) && (legality != null)) {
          card.languages = languages;
          card.legality = legality;
          return callback(null, card);
        }
      };
    };
    gatherer.card(details, get(function(data) {
      return card = data;
    }));
    gatherer.languages(details, get(function(data) {
      return languages = data;
    }));
    return gatherer.printings(details, get(function(data) {
      return legality = data.legality, data;
    }));
  };

}).call(this);
