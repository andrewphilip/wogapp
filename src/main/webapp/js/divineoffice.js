			var app = angular.module("divineoffice",[]);
			
				app.controller('divineofficeCtrl',function($scope, $location,$http,$sce,$filter,usSpinnerService){
					console.log('In divineofficeCtrl');
					$scope.$location = $location;
					$scope.curdate = new Date();
					$scope.dateStr = $filter('date')($scope.curdate, 'MMM dd');
					console.log("Current date:"+$scope.dateStr);
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}
						
					$scope.feedSrc='http://divineoffice.org/?feed=nokia';
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
				
