			var app = angular.module("modresources",[]);

			app.controller('teachCtrl',function($scope, $location,$http,$sce, usSpinnerService){
					console.log('In teachCtrl');
					$scope.$location = $location;
					$scope.loadCont=function(url){
						usSpinnerService.spin('spinner-1');
						$http.get(url).then(function(res){
							console.log(res);
							//$scope.pnldata = res.data;
							$scope.pnldata=$sce.trustAsHtml(res.data);
							usSpinnerService.stop('spinner-1');
						});

					}
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}
					
					
				});
				app.controller('faqCtrl', function($scope, $location,$http,$sce){
					console.log('In faqCtrl');
					$scope.$location = $location;
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}
					
				});			
				app.controller('popeCtrl', function($scope, $location,$http){
					console.log('In popeCtrl');
					$scope.$location = $location;
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}
					$http.get("data/popelist.json").then(function(res){
						console.log("popelist.json="+res.data);
						$scope.mydata =res.data;
					});
					
					
				});			
				app.controller('councilCtrl', function($scope, $location,$http,$sce){
					console.log('In councilCtrl');
					$scope.$location = $location;
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}
					
					$scope.cname;
					$http.get("data/councils.json").then(function(res){
						console.log("councils.json="+res.data);
						$scope.councils =res.data;
					});
					
					
					$scope.loadCouncil =function(cobj){
						$scope.cname = cobj.name;
						$scope.cyear = cobj.year;
						$scope.pnlcdata = $sce.trustAsHtml(cobj.summary);
					}
					
				});			
				
				app.controller('chfatherCtrl', function($scope, $location,$http,$sce){
					console.log('In chfatherCtrl');
					$scope.$location = $location;
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}
					
					$scope.cfname;
					$http.get("data/churchfathers.json").then(function(res){
						console.log("churchfathers.json="+res.data);
						$scope.fathers =res.data;
					});
					
					
					$scope.loadfather =function(cobj){
						$scope.cfname = cobj.name;
						$scope.pnlcfdata = $sce.trustAsHtml(cobj.summary);
					}
					
				});			
				
				app.controller('aposCtrl', function($scope, $location,$http,$sce){
					console.log('In aposCtrl');
					$scope.$location = $location;
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}
					
					$scope.cfname;
					$http.get("data/apostles.json").then(function(res){
						console.log("apostles.json="+res.data);
						$scope.apostles =res.data;
					});
					
					
					$scope.loadApostle =function(cobj){
						$scope.apname = cobj.name;
						$scope.pnlapdesc = $sce.trustAsHtml(cobj.desc);
						$scope.apsymbol = cobj.symbol;
						$scope.apfeast = cobj.feast;
					}
					
				});			
