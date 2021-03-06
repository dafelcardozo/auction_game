/**
 * Item model events
 */

'use strict';

import {EventEmitter} from 'events';
var Item = require('../../sqldb').Item;
var ItemEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ItemEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Item.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ItemEvents.emit(event + ':' + doc._id, doc);
    ItemEvents.emit(event, doc);
    done(null);
  }
}

export default ItemEvents;
