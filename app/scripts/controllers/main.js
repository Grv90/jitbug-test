'use strict';

/**
 * @ngdoc function
 * @name jitbugTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jitbugTestApp
 */
angular.module('jitbugTestApp')
  .controller('MainCtrl', ['$scope','Main','calendarConfig','moment','alert',MainCtrl]);
  function MainCtrl($scope,Main,calendarConfig,moment,alert){

   var vm = this;

    $scope.cellIsOpen = true;

    $scope.option={
      "label":"Users"
    }
    Main.fetchAllJobs().then(function(result){
      $scope.openJobs=result.data.open;
      $scope.closedJobs=result.data.closed;
    })

    Main.fetchWeeklyJobs().then(function(result){
      $scope.weeklyJobsList=result.data;
$scope.events=[];
      angular.forEach($scope.weeklyJobsList,function(value,key){
        var startDummyDate=new Date(value.start);
        var endDummyDate=new Date(value.end);
        var imageStr=[];
        var statusColor;
        // if(value.candidates.length>=1){
        //   angular.forEach(value.candidates,function(newValue,newkey){
        //     if(imageStr.length==0)
        //     imageStr[key]=newValue.name+' ';
        //     //  imageStr[key]="<img src=images/"+newValue.thumbnail+">";
        //      else{
        //        imageStr[key]=imageStr[key].concat(' '+ newValue.name);
        //       //  imageStr[key]=imageStr[key].concat("<img src=images/"+newValue.thumbnail+">");
        //      }
        //   })
        // }
        if(imageStr.length==0)
        imageStr[key]="";
        if(value.status=="Unconfirmed")
        statusColor= calendarConfig.colorTypes.warning;
        else {
          statusColor= calendarConfig.colorTypes.success;
        }

        $scope.jsonEvents =
          {
            title: value.centre+' ' +imageStr[key],
            status:value.status,
            candidates:value.candidates,
            color: statusColor,
            startsAt: new Date(startDummyDate.getFullYear(),startDummyDate.getMonth(),startDummyDate.getDate()),
            endsAt: new Date(endDummyDate.getFullYear(),endDummyDate.getMonth(),endDummyDate.getDate()),
            draggable: true,
            resizable: true,
            actions: actions
          }
        $scope.events.push($scope.jsonEvents);
      })
    })



    $scope.calendarView = 'week';
   $scope.viewDate = new Date();
   var actions = [{
     label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
     onClick: function(args) {
       alert.show('Edited', args.calendarEvent);
     }
   }, {
     label: '<i class=\'glyphicon glyphicon-remove\'></i>',
     onClick: function(args) {
       alert.show('Deleted', args.calendarEvent);
     }
   }];



   $scope.cellIsOpen = true;



   $scope.eventClicked = function(event) {
     alert.show('Clicked', event);
   };

   $scope.eventEdited = function(event) {
     alert.show('Edited', event);
   };

   $scope.eventDeleted = function(event) {
     alert.show('Deleted', event);
   };

   $scope.eventTimesChanged = function(event) {
     alert.show('Dropped or resized', event);
   };

   $scope.toggle = function($event, field, event) {
     $event.preventDefault();
     $event.stopPropagation();
     event[field] = !event[field];
   };

   $scope.timespanClicked = function(date, cell) {

  if ($scope.calendarView === 'month') {
    if (($scope.cellIsOpen && moment(date).startOf('day').isSame(moment($scope.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
      $scope.cellIsOpen = false;
    } else {
      $scope.cellIsOpen = true;
      $scope.viewDate = date;
    }
  } else if ($scope.calendarView === 'year') {
    if (($scope.cellIsOpen && moment(date).startOf('month').isSame(moment($scope.viewDate).startOf('month'))) || cell.events.length === 0) {
      $scope.cellIsOpen = false;
    } else {
      $scope.cellIsOpen = true;
      $scope.viewDate = date;
    }
  }

};


  }
