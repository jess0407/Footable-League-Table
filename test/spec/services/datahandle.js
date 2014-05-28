'use strict';

describe('Service: Datahandle', function () {

  // load the service's module
  beforeEach(module('angularAppApp'));

  // instantiate service
  var Datahandle;
  beforeEach(inject(function (_Datahandle_) {
    Datahandle = _Datahandle_;
  }));

  it('should do something', function () {
    expect(!!Datahandle).toBe(true);
  });

});
