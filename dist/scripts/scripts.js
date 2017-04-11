"use strict";function MainCtrl(a,b,c,d,e){a.cellIsOpen=!0,a.option={label:"Users"},b.fetchAllJobs().then(function(b){a.openJobs=b.data.open,a.closedJobs=b.data.closed}),b.fetchWeeklyJobs().then(function(b){a.weeklyJobsList=b.data,a.events=[],angular.forEach(a.weeklyJobsList,function(b,d){var e,g=new Date(b.start),h=new Date(b.end),i=[];0==i.length&&(i[d]=""),e="Unconfirmed"==b.status?c.colorTypes.warning:c.colorTypes.success,a.jsonEvents={title:b.centre+" "+i[d],status:b.status,candidates:b.candidates,color:e,startsAt:new Date(g.getFullYear(),g.getMonth(),g.getDate()),endsAt:new Date(h.getFullYear(),h.getMonth(),h.getDate()),draggable:!0,resizable:!0,actions:f},a.events.push(a.jsonEvents)})}),a.calendarView="week",a.viewDate=new Date;var f=[{label:"<i class='glyphicon glyphicon-pencil'></i>",onClick:function(a){e.show("Edited",a.calendarEvent)}},{label:"<i class='glyphicon glyphicon-remove'></i>",onClick:function(a){e.show("Deleted",a.calendarEvent)}}];a.cellIsOpen=!0,a.eventClicked=function(a){e.show("Clicked",a)},a.eventEdited=function(a){e.show("Edited",a)},a.eventDeleted=function(a){e.show("Deleted",a)},a.eventTimesChanged=function(a){e.show("Dropped or resized",a)},a.toggle=function(a,b,c){a.preventDefault(),a.stopPropagation(),c[b]=!c[b]},a.timespanClicked=function(b,c){"month"===a.calendarView?a.cellIsOpen&&d(b).startOf("day").isSame(d(a.viewDate).startOf("day"))||0===c.events.length||!c.inMonth?a.cellIsOpen=!1:(a.cellIsOpen=!0,a.viewDate=b):"year"===a.calendarView&&(a.cellIsOpen&&d(b).startOf("month").isSame(d(a.viewDate).startOf("month"))||0===c.events.length?a.cellIsOpen=!1:(a.cellIsOpen=!0,a.viewDate=b))}}angular.module("jitbugTestApp",["jitbugTestApp.services","ngAnimate","ngCookies","ngResource","ngRoute","smart-table","mwl.calendar","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("jitbugTestApp").controller("MainCtrl",["$scope","Main","calendarConfig","moment","alert",MainCtrl]),angular.module("jitbugTestApp.services",[]).factory("Main",["$q","$http",function(a,b){var c=function(){var c=a.defer();return b.get("jobs.json").then(function(a){return c.resolve(a)}),c.promise},d=function(){var c=a.defer();return b.get("weeklyJobs.json").then(function(a){return c.resolve(a)}),c.promise};return{fetchAllJobs:c,fetchWeeklyJobs:d}}]),angular.module("jitbugTestApp").factory("alert",["$uibModal",function(a){function b(b,c){return a.open({templateUrl:"views/modal.html",controller:function(){var a=this;a.action=b,a.event=c},controllerAs:"vm"})}return{show:b}}]),angular.module("jitbugTestApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="row padding"> <div class="col-md-5 col-xs-12"> <h3 class="componentTitle">Jobs This Week</h3> <span><small><i>Listing of confirmed and unconfirmed Jobs</i></small></span> <hr> <div class="row text-center padding"> <div class="btn-group"> <button class="btn btn-primary" mwl-date-modifier date="viewDate" decrement="calendarView" ng-click="cellIsOpen = false"> Previous Week </button> <button class="btn btn-default" mwl-date-modifier date="viewDate" set-to-today ng-click="cellIsOpen = false"> Current </button> <button class="btn btn-primary" mwl-date-modifier date="viewDate" increment="calendarView" ng-click="cellIsOpen = false"> Next Week </button> </div> </div> <mwl-calendar events="events" view="calendarView" view-title="calendarTitle" view-date="viewDate" on-event-click="eventClicked(calendarEvent)" on-event-times-changed="eventTimesChanged(calendarEvent); calendarEvent.startsAt = calendarNewEventStart; calendarEvent.endsAt = calendarNewEventEnd" cell-is-open="cellIsOpen" day-view-start="06:00" day-view-end="22:59" day-view-split="30" cell-modifier="modifyCell(calendarCell)" cell-auto-open-disabled="true" on-timespan-click="timespanClicked(calendarDate, calendarCell)"> </mwl-calendar> <small><i><span class="gylphicon glyphicon-asterisk"></span> Click on event to get complete details.</i></small> </div> <div class="col-md-7 col-xs-12"> <h3 class="componentTitle">Open Jobs</h3> <span><small><i>Listing of all the open jobs</i></small></span> <hr> <table st-table="displayedCollectionForOpenJobs" st-safe-src="openJobs " class="table table-responsive table-striped table-hover"> <thead class="thead-default"> <tr> <th st-sort="center">Center</th> <th st-sort="jobtitle">Job Title</th> <th st-sort="start">Start</th> <th st-sort="end">End</th> <th st-sort="sentat">Sent At</th> <th st-sort="avail">Available</th> <th st-sort="seenby">SeenBy</th> <th st-sort="sentto">SentTo</th> <th st-sort="unavailable">Unavailable</th> </tr> <tr> <th colspan="12"><input st-search="" class="form-control" placeholder="Search ... " type="text "></th> </tr> </thead> <tbody> <tr ng-repeat="row in displayedCollectionForOpenJobs "> <td>{{row.centre}}</td> <td><span ng-if="row.jobtitle==\'Qualified teacher\'" class="label label-success">{{row.jobtitle}}</span> <span ng-if="row.jobtitle==\'Unqualified teacher\'" class="label label-danger">{{row.jobtitle}}</span> </td> <td>{{row.start | date:\'short\'}}</td> <td>{{row.end}}</td> <td>{{row.sentat}}</td> <td class="text-center"><span ng-if="row.avail==0" class="label label-danger">{{row.avail}}</span> <span ng-if="row.avail!=0">{{row.avail}}</span> </td> <td class="text-center"> <span ng-if="row.seenby==0" class="label label-danger">{{row.seenby}}</span> <span ng-if="row.seenby!=0">{{row.seenby}}</span> </td> <td class="text-center"> <span ng-if="row.sentto==0" class="label label-danger">{{row.sentto}}</span> <span ng-if="row.sentto!=0">{{row.sentto}}</span> </td> <td class="text-center"> <span ng-if="row.unavailable==0" class="label label-danger">{{row.unavailable}}</span> <span ng-if="row.unavailable!=0">{{row.unavailable}}</span> </td> </tr> </tbody> <tfoot> <tr> <td colspan="12" class="text-center"> <div st-pagination="" st-items-by-page="3" st-displayed-pages="7"></div> </td> </tr> </tfoot> </table> </div> </div> <div class="row padding"> <div class="col-md-5 col-xs-12"> <h3 class="componentTitle">User Search</h3> <span><small><i>Search using the users and organistaion</i></small></span> <hr> <h5>Select option to filter your search &nbsp; <label> <input type="radio" ng-model="option.label" value="Users"> Users </label> &nbsp; <label> <input type="radio" ng-model="option.label" value="Organistaion"> Organisation </label> </h5> <div class="row"> <div class="col-md-7"> <input type="text" name="input" placeholder="Search for {{option.label}}" class="form-control"> </div> <div class="col-md-3"> <button class="btn btn-primary"><span class="glyphicon glyphicon-search"></span>&nbsp;&nbsp;Look</button> </div> </div> </div> <div class="col-md-7 col-xs-12"> <h3 class="componentTitle">Closed Jobs</h3> <span><small><i>Listing of all the closed jobs</i></small></span> <hr> <table st-table="displayedCollectionForClosedJobs" st-safe-src="closedJobs " class="table table-responsive table-striped table-hover"> <thead class="thead-default"> <tr> <th st-sort="center">Center</th> <th st-sort="jobtitle ">Job Title</th> <th st-sort="start">Start</th> <th st-sort="end">End</th> <th st-sort="closedat">Closed At</th> <th st-sort="confirmedCdd">Confirmed</th> </tr> <tr> <th colspan="12"><input st-search="" class="form-control" placeholder="Search ... " type="text "></th> </tr> </thead> <tbody> <tr ng-repeat="row in displayedCollectionForClosedJobs"> <td>{{row.centre}}</td> <td><span ng-if="row.jobtitle==\'Qualified teacher\' " class="label label-success">{{row.jobtitle}}</span> <span ng-if="row.jobtitle==\'Unqualified teacher\' " class="label label-danger">{{row.jobtitle}}</span> </td> <td>{{row.start}}</td> <td>{{row.end}}</td> <td> {{row.closedat}} </td> <td> <span class="label label-info">{{row.confirmedCdd}}</span> </td> </tr> </tbody> <tfoot> <tr> <td colspan="12" class="text-center"> <div st-pagination=" " st-items-by-page="3 " st-displayed-pages="7 "></div> </td> </tr> </tfoot> </table> </div> </div>'),a.put("views/modal.html",'<div class="modal-header"> <h3 class="modal-title">{{ vm.event.title}}</h3> </div> <div class="modal-body"> <div class="row"> <div class="col-md-6"> <p>Start Date: <pre>{{ vm.event.startsAt | date:\'medium\' }}</pre> </p> </div> <div class="col-md-6"> <p>Start Date: <pre>{{ vm.event.endsAt | date:\'medium\' }}</pre> </p> </div> </div> <hr> <p>Candidates Status is <span ng-if="vm.event.status==\'Confirmed\'" class="label label-success">Confirmed</span><span ng-if="vm.event.status==\'Unconfirmed\'" class="label label-danger">Unconfirmed</span> </p> <hr> <p>List of candidates: <div class="row"> <div class="col-md-4" ng-repeat="candidate in vm.event.candidates"> <div class="thumbnail"> <a> <img src="images/{{candidate.thumbnail}}" alt="{{candidate.thumbnail}}" style="width:100%"> <div class="caption"> <p>{{candidate.name}}</p> </div> </a> </div> </div> <div class="col-md-4" ng-if="vm.event.candidates.length==0"> <p class="info"> <span class="glyphicon glyphicon-info-sign"></span>&nbsp;No Candidates found. </p> </div> </div> </p> </div> <div class="modal-footer"> <button class="btn btn-primary" ng-click="$close()">OK</button> </div>')}]);