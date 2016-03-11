			var app = angular.module("modmedia",[]);
			
				app.controller('audioCtrl',function($scope, $location){
					console.log('In audioCtrl');
					$scope.$location = $location;
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}

					$scope.playSong = function(song,title){
						auid.src = song;
						auid.load();
						auid.play();
						$scope.playSource = title;
					}
				});
				app.controller('videoCtrl',function($scope, $location){
					console.log('In videoCtrl');
					$scope.$location = $location;
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}

					$scope.loadAndPlay = function(vitem,title){
						console.log(vitem);
						vid.src = vitem;
						$scope.playSource = title;
					}
				});
				
