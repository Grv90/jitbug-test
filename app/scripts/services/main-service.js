'use strict';

angular.module('jitbugTestApp.services', [])
.factory('Main', function($q, $http) {

  var fetchAllJobs = function() {
    var deferred = $q.defer();
    $http.get('jobs.json')
      .then(function(response) {
        return deferred.resolve(response);
      });
    return deferred.promise;
  };

  var fetchWeeklyJobs = function() {
    var deferred = $q.defer();
    $http.get('weeklyJobs.json')
      .then(function(response) {
        return deferred.resolve(response);
      });
    return deferred.promise;
  };
  return {
    fetchAllJobs: fetchAllJobs,
    fetchWeeklyJobs:fetchWeeklyJobs
  };

});
