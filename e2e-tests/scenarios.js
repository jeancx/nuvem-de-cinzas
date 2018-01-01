'use strict';

describe('app', function () {

  it('should automatically redirect to /main when location hash/fragment is empty', function () {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('main', function () {

    beforeEach(function () {
      browser.get('index.html#!/view1');
    });

    it('should render view1 when user navigates to /view1', function () {
      expect(element.all(by.css('[ng-view] p')).first().getText()).toMatch(/partial for view 1/);
    });

  });

});
