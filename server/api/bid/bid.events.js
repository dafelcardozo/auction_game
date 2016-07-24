/**
 * Bid model events
 */

'use strict';

import {EventEmitter} from 'events';
var Bid = require('../../sqldb').Bid;
var BidEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BidEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Bid.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    BidEvents.emit(event + ':' + doc._id, doc);
    BidEvents.emit(event, doc);
    done(null);
  }
}

export default BidEvents;
