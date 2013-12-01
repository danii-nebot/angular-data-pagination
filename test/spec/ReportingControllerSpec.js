describe("ReportingController", function() {
  var ctrl, scope;

  beforeEach(module('assignment'));

  beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('ReportingController', {
          $scope: scope
      });
  }));

  describe("Test scope values update correctly after user interaction", function() {

    it("Initial values are correct", inject(function(reportingModel) {
      scope.$apply();
      // begin with 10 items per page
      expect(scope.itemsPerPage).toEqual(10);
      // in page 1
      expect(scope.currentPage).toEqual(1);
      // country list should be 10 items long
      expect(scope.countryList.length).toEqual(10);
      // there should be correct number of pages
      expect(scope.numPages).toEqual(Math.ceil(reportingModel.countries.length/scope.itemsPerPage));
    }));

    it("Values update correctly after items per page change", inject(function(reportingModel) {
      scope.$apply();
      var testValues = [20,30,10];
      for(var ii=0; ii<testValues.length; ii++) {
        scope.itemsPerPage = testValues[ii];
        scope.$apply();
        expect(scope.itemsPerPage).toEqual(testValues[ii]);
        // should go back to page 1
        expect(scope.currentPage).toEqual(1);
        // country list should never be longer than items per page value
        if(reportingModel.countries.length >= scope.itemsPerPage) {
          expect(scope.countryList.length).toEqual(testValues[ii]);
        } else {
          expect(scope.countryList.length).toBeLessThan(testValues[ii]);
        }

        // there should be correct number of pages
        expect(scope.numPages).toEqual(Math.ceil(reportingModel.countries.length/testValues[ii]));
      }
    }));

    it("Values update correctly after page change", inject(function(reportingModel) {
      scope.$apply();
      // lets test for pages 2, last and back to first
      testValues = [2,scope.numPages,1];
      for(var ii=0; ii<testValues.length; ii++) {
        scope.currentPage = testValues[ii];
        scope.$apply();
        expect(scope.currentPage).toEqual(testValues[ii]);
        // country list should be at most items per page,
        // but can be less (in case of last page!)
        expect(scope.countryList.length).toBeLessThan(scope.itemsPerPage+1);
      }
    }));
  });
});