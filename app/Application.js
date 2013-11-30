
var app = angular.module( "assignment", [ ] );

/* The factory creates the various models for the application */
app.factory('reportingModel', function()
{
    return new ReportingModel();
});

/*
 * This configures the routes and associates each route with a view and a controller
 */
app.config(function ($routeProvider)
{
    $routeProvider
        .when('/reporting',
        {
            controller: 'ReportingController',
            templateUrl: 'app/templates/reporting.html'
        })
        .otherwise({ redirectTo: '/reporting' });
});

/*
 * Configure range filter
 * from: http://stackoverflow.com/questions/11873570/angularjs-for-loop-with-numbers-ranges
 */
app.filter('pageRange', function() {
  return function(input, total) {
    total = parseInt(total)+1;
    for (var i=1; i<total; i++)
      input.push(i);
    return input;
  };
});


