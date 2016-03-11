			var app = angular.module("dailyscripture",[]);
			
				app.controller('dailyreadingCtrl',function($scope, $location,$http,$sce,usSpinnerService){
					console.log('In dailyreadingCtrl');
					$scope.$location = $location;
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}

					$scope.feedSrc='http://www.usccb.org/bible/readings/rss/';
					//usSpinnerService.spin('spinner-1');

					$http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent($scope.feedSrc)).then(function(res){
						console.log("before obtaining feeds..");
						$scope.feeds=res.data.responseData.feed.entries;
					});
				
					$scope.loadCont =function(fobj){
						$scope.ftitle = fobj.title;
						$scope.pnlfcontent = $sce.trustAsHtml(fobj.content);
						//usSpinnerService.stop('spinner-1');

					}
					
				
				});
				
