'use strict';

describe('Service: Footballdata', function () {

  // load the service's module
  beforeEach(module('angularAppApp'));

  // instantiate service
  var Footballdata;
  beforeEach(inject(function (_Footballdata_) {
    Footballdata = _Footballdata_;
  }));

  it('should do something', function () {
    expect(!!Footballdata).toBe(true);
  });

});
