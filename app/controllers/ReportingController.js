app.controller('ReportingController', function ($scope, reportingModel)
{
  // initial set up
  $scope.currentPage = 1;
  $scope.itemsPerPageOptions = [10, 20, 30];
  $scope.itemsPerPage = 10;
  $scope.numPages = 0;
  $scope.countryList = [];

  var numCountries = reportingModel.countries.length;

  $scope.setItemsPerPage = function(newItemsPerPageValue) {
    $scope.itemsPerPage = newItemsPerPageValue;
  }

  $scope.goToPage = function(pageTo) {
    $scope.currentPage = pageTo;
  }

  // update list of countries when length selector changes
  $scope.$watch('itemsPerPage', function() {
    $scope.numPages = Math.ceil(numCountries/$scope.itemsPerPage);
    // reset paginator
    $scope.currentPage = 1;
    _updateList();
  });

  // update list of countries when new page is selected
  $scope.$watch('currentPage', function() {
    _updateList();
  });

  function _updateList() {
    var begin = $scope.itemsPerPage*($scope.currentPage-1);
    var end = $scope.itemsPerPage*($scope.currentPage);
    $scope.countryList = reportingModel.countries.slice(begin, end);
  }

});
