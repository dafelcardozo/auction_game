'use strict';

var app = require('../..');
import request from 'supertest';

var newAuction;

describe('Auction API:', function() {

  describe('GET /api/auctions', function() {
    var auctions;

    beforeEach(function(done) {
      request(app)
        .get('/api/auctions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          auctions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(auctions).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/auctions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/auctions')
        .send({
          name: 'New Auction',
          info: 'This is the brand new auction!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAuction = res.body;
          done();
        });
    });

    it('should respond with the newly created auction', function() {
      expect(newAuction.name).to.equal('New Auction');
      expect(newAuction.info).to.equal('This is the brand new auction!!!');
    });

  });

  describe('GET /api/auctions/:id', function() {
    var auction;

    beforeEach(function(done) {
      request(app)
        .get('/api/auctions/' + newAuction._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          auction = res.body;
          done();
        });
    });

    afterEach(function() {
      auction = {};
    });

    it('should respond with the requested auction', function() {
      expect(auction.name).to.equal('New Auction');
      expect(auction.info).to.equal('This is the brand new auction!!!');
    });

  });

  describe('PUT /api/auctions/:id', function() {
    var updatedAuction;

    beforeEach(function(done) {
      request(app)
        .put('/api/auctions/' + newAuction._id)
        .send({
          name: 'Updated Auction',
          info: 'This is the updated auction!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAuction = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAuction = {};
    });

    it('should respond with the updated auction', function() {
      expect(updatedAuction.name).to.equal('Updated Auction');
      expect(updatedAuction.info).to.equal('This is the updated auction!!!');
    });

  });

  describe('DELETE /api/auctions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/auctions/' + newAuction._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when auction does not exist', function(done) {
      request(app)
        .delete('/api/auctions/' + newAuction._id)
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
