'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var auctionCtrlStub = {
  index: 'auctionCtrl.index',
  show: 'auctionCtrl.show',
  create: 'auctionCtrl.create',
  update: 'auctionCtrl.update',
  destroy: 'auctionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var auctionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './auction.controller': auctionCtrlStub
});

describe('Auction API Router:', function() {

  it('should return an express router instance', function() {
    expect(auctionIndex).to.equal(routerStub);
  });

  describe('GET /api/auctions', function() {

    it('should route to auction.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'auctionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/auctions/:id', function() {

    it('should route to auction.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'auctionCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/auctions', function() {

    it('should route to auction.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'auctionCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/auctions/:id', function() {

    it('should route to auction.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'auctionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/auctions/:id', function() {

    it('should route to auction.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'auctionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/auctions/:id', function() {

    it('should route to auction.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'auctionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
