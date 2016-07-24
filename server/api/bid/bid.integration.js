'use strict';

var app = require('../..');
import request from 'supertest';

var newBid;

describe('Bid API:', function() {

  describe('GET /api/bids', function() {
    var bids;

    beforeEach(function(done) {
      request(app)
        .get('/api/bids')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bids = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(bids).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/bids', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bids')
        .send({
          name: 'New Bid',
          info: 'This is the brand new bid!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBid = res.body;
          done();
        });
    });

    it('should respond with the newly created bid', function() {
      expect(newBid.name).to.equal('New Bid');
      expect(newBid.info).to.equal('This is the brand new bid!!!');
    });

  });

  describe('GET /api/bids/:id', function() {
    var bid;

    beforeEach(function(done) {
      request(app)
        .get('/api/bids/' + newBid._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bid = res.body;
          done();
        });
    });

    afterEach(function() {
      bid = {};
    });

    it('should respond with the requested bid', function() {
      expect(bid.name).to.equal('New Bid');
      expect(bid.info).to.equal('This is the brand new bid!!!');
    });

  });

  describe('PUT /api/bids/:id', function() {
    var updatedBid;

    beforeEach(function(done) {
      request(app)
        .put('/api/bids/' + newBid._id)
        .send({
          name: 'Updated Bid',
          info: 'This is the updated bid!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBid = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBid = {};
    });

    it('should respond with the updated bid', function() {
      expect(updatedBid.name).to.equal('Updated Bid');
      expect(updatedBid.info).to.equal('This is the updated bid!!!');
    });

  });

  describe('DELETE /api/bids/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bids/' + newBid._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bid does not exist', function(done) {
      request(app)
        .delete('/api/bids/' + newBid._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
