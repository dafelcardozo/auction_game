'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bidCtrlStub = {
  index: 'bidCtrl.index',
  show: 'bidCtrl.show',
  create: 'bidCtrl.create',
  update: 'bidCtrl.update',
  destroy: 'bidCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bidIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bid.controller': bidCtrlStub
});

describe('Bid API Router:', function() {

  it('should return an express router instance', function() {
    expect(bidIndex).to.equal(routerStub);
  });

  describe('GET /api/bids', function() {

    it('should route to bid.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'bidCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/bids/:id', function() {

    it('should route to bid.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'bidCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/bids', function() {

    it('should route to bid.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'bidCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/bids/:id', function() {

    it('should route to bid.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'bidCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bids/:id', function() {

    it('should route to bid.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'bidCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bids/:id', function() {

    it('should route to bid.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'bidCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
