				var app = angular.module("app",['ngRoute','modresources','modmedia','dailyscripture','divineoffice','angularSpinner']);
				app.config(function($routeProvider,$httpProvider){
					$httpProvider.defaults.useXDomain = true;
					delete $httpProvider.defaults.headers.common['X-Requested-With'];
					
					$routeProvider
						.when('/prayers',{controller:'prayerCtrl', templateUrl:'prayers.html'})
						.when('/saints',{controller:'saintCtrl', templateUrl:'saints.html'})
						.when('/audio',{controller:'audioCtrl', templateUrl:'audio.html'})
						.when('/video',{controller:'videoCtrl', templateUrl:'video.html'})
						//.when('/contact',{controller:'navCtrl', templateUrl:'contact.html'})
						.when('/teachings',{controller:'teachCtrl', templateUrl:'teachings.html'})
						.when('/faq',{controller:'faqCtrl', templateUrl:'faq.html'})
						.when('/popes',{controller:'popeCtrl', templateUrl:'listpopes.html'})
						.when('/councils',{controller:'councilCtrl', templateUrl:'councils.html'})
						.when('/cfathers',{controller:'chfatherCtrl', templateUrl:'churchfathers.html'})
						.when('/apostles',{controller:'aposCtrl', templateUrl:'apostles.html'})
						.when('/dailyreadings',{controller:'dailyreadingCtrl', templateUrl:'dailyreadings.html'})
						.when('/divineoffice',{controller:'divineofficeCtrl', templateUrl:'divineoffice.html'})
						.when('/home',{controller:'navCtrl', templateUrl:'home.html'})
						.when('/bible',{controller:'bibleCtrl', templateUrl:'bible.html'})
						.otherwise({redirectTo: '/home'});

				});
				app.directive('bsPopover', function(){
					return function(scope,element,attrs){
							console.log("inside bsPopover");
							element.find("a[rel=popover]").popover({placement:'bottom', html:'true'});
					};
				});
				
				app.directive('fixedHeader', function($timeout){
					return {
			            restrict: 'A',
			            link: link
					};
					
			        function link($scope, $elem, $attrs, $ctrl) {
			            var elem = $elem[0];
						console.log("inside link");
			            // wait for data to load and then transform the table
			            $scope.$watch(tableDataLoaded, function(isTableDataLoaded) {
			                if (isTableDataLoaded) {
			                    transformTable();
			                }
			            });

			            function tableDataLoaded() {
			                // first cell in the tbody exists when data is loaded but doesn't have a width
			                // until after the table is transformed
			                var firstCell = elem.querySelector('tbody tr:first-child td:first-child');
			               // console.log("firstCell:"+firstCell);
			               // console.log("firstCell.style.width:"+firstCell.style.width);
			                return firstCell && !firstCell.style.width;
			            }

			            function transformTable() {
							console.log("inside transformTable");
			                // reset display styles so column widths are correct when measured below
			                angular.element(elem.querySelectorAll('thead, tbody, tfoot')).css('display', '');

			                // wrap in $timeout to give table a chance to finish rendering
			                $timeout(function () {
			                    // set widths of columns
			                    angular.forEach(elem.querySelectorAll('tr:first-child th'), function (thElem, i) {

			                        var tdElems = elem.querySelector('tbody tr:first-child td:nth-child(' + (i + 1) + ')');
			                        var tfElems = elem.querySelector('tfoot tr:first-child td:nth-child(' + (i + 1) + ')');

			                        var columnWidth = tdElems ? tdElems.offsetWidth : thElem.offsetWidth;
			                        if (tdElems) {
			                            tdElems.style.width = columnWidth + 'px';
			                        }
			                        if (thElem) {
			                            thElem.style.width = columnWidth + 'px';
			                        }
			                        if (tfElems) {
			                            tfElems.style.width = columnWidth + 'px';
			                        }
			                    });

			                    // set css styles on thead and tbody
			                    angular.element(elem.querySelectorAll('thead, tfoot')).css('display', 'block');

			                    angular.element(elem.querySelectorAll('tbody')).css({
			                        'display': 'block',
			                        'height': $attrs.tableHeight || 'inherit',
			                        'overflow': 'auto'
			                    });

			                    // reduce width of last column by width of scrollbar
			                    var tbody = elem.querySelector('tbody');
			                    var scrollBarWidth = tbody.offsetWidth - tbody.clientWidth;
			                    if (scrollBarWidth > 0) {
			                        // for some reason trimming the width by 2px lines everything up better
			                        scrollBarWidth -= 2;
			                        var lastColumn = elem.querySelector('tbody tr:first-child td:last-child');
			                        lastColumn.style.width = (lastColumn.offsetWidth - scrollBarWidth) + 'px';
			                    }
			                });
			            }
			        } //link					
				});
				
				app.filter('substring',function(){
					
					return function(str, start,end){
						return str.substring(start,end);	
					}
				});
				
				app.filter('startsWith',function(){
					
					return function(obj, srch){
						//console.log("feed:"+obj);
						
						if(angular.isArray(obj)){
							console.log(obj.title);
							var tmp=[]
							angular.forEach(obj, function(o, idx, ob){
								if(angular.isString(o.title)){
									console.log(o.title.indexOf(srch));
									if(o.title.indexOf(srch) === 0 ){
										tmp.push(o);
									}
								}
							});
							return tmp;
						}
						
						
					}
				});
				
				app.filter('highlight',function($sce){
					return function(text,phrase){
						var srchExp= new RegExp("("+phrase+")", "gi");
						if(phrase){
							text = text.replace(srchExp, '<span class="highlighted">$1</span>');
						}
						return $sce.trustAsHtml(text);
					}
				});
				
				
				app.filter('offset', function(){
					return function(input, start){
						start = parseInt(start,10);
						return input.slice(start);
					}
				});
				
				app.controller('navCtrl',function($scope, $location){
					console.log('In navCtrl');
					console.log('json data: '+saintsArr);
					//console.log($location.path);
					$scope.$location = $location;
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}
					
					
				});
				app.controller('prayerCtrl',function($scope, $location,$sce,$http){
					console.log('In prayerCtrl');
					$scope.title;
					$scope.prayer;
					//console.log($location.path);
					$scope.$location = $location;
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}
					function loadMarianPrayers(){
						$http.get("marianprayers.json").then(function(res){
							console.log("marianprayers.json="+res.data);
							$scope.marian = res.data;
							console.log("data: "+$scope.marian);
							
						});
					}
					
					$http.get("data/prayers.json").then(function(res){
						console.log("prayers.json="+res.data);
						$scope.mydata =res.data.prayers;
						console.log("data: "+$scope.mydata);
						$scope.marian = res.data.marian;
						console.log("mdata: "+$scope.marian);
						},
						function(res){
							console.log("Request failed:"+res.data);
							console.log("status:"+res.status);
						}
					);
					

					$scope.getContent = function(o){
						console.log("code:"+o.code);
						$scope.title = o.title;
						$scope.prayer = $sce.trustAsHtml(o.data);
						console.log("data:"+o.data);
					}
					
				});

				app.controller('saintCtrl', function($scope, $location,$http){
					console.log('In saintCtrl');
					$scope.$location = $location;
					$scope.sort="name";
					$scope.toggle=false;
					$scope.itemsPerPage=25;
					$scope.curPage=0;
					
					$http.get("data/saints.json").then(function(res){
						console.log("saints.json="+res.data);
						$scope.saintsArr =res.data;
					});
					
					$scope.saintsArr = saintsArr;
					console.log("saintsArr:"+$scope.saintsArr);
					
					$scope.prevPage = function(){
						if($scope.curPage > 0){
							$scope.curPage--;
						}
					};
					$scope.pageCount = function(){
						return Math.ceil($scope.saintsArr.length/$scope.itemsPerPage)-1;
					};
					
					$scope.nextPage = function(){
						if($scope.curPage < $scope.pageCount()){
							$scope.curPage++;
						}
					};
					
					$scope.disableNextPage = function(){
						console.log("inside disableNextPage()");
						return $scope.curPage === $scope.pageCount() ? "disabled" : "";
					}
					
					$scope.disablePrevPage = function(){
						console.log("inside disablePrevPage()");
						return $scope.curPage === 0 ? "disabled" : "";
					}
					
					$scope.range = function() {
					    var rangeSize = 5;
					    var ret = [];
					    var start;

					    start = $scope.curPage;
					    if ( start > $scope.pageCount()-rangeSize ) {
					      start = $scope.pageCount()-rangeSize+1;
					    }

					    for (var i=start; i<start+rangeSize; i++) {
					      ret.push(i);
					    }
					    return ret;
					 };	
					 
					 $scope.setPage = function(n) {
						    $scope.curPage = n;
					 };					 
					/*
					$scope.getInfo = function(name){
						var jsObj=_.where(jsonData, {Name: name});
						$scope.sobj = jsObj[0];
						//$scope.sname=$scope.sobj.Name;
						console.log("Saint Object: "+jsObj);
						console.log(jsObj[0]["Short-Desc"]);
					}
					*/
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}
					
					$scope.doSort = function(val){
						console.log("doSort("+val+")");
						if($scope.sort == val){
							$scope.toggle = !$scope.toggle;
						}
						else{
							$scope.sort = val;
							$scope.toggle=false;
						}
					}
					
					
				});

				app.controller('bibleCtrl',function($scope, $location,$sce,$http,$q){
					var filtered=[];
					console.log('In bibleCtrl');
					$scope.$location = $location;
					$scope.selBook ;
					$scope.srchTxt;
					$scope.showLoad=false;
					$scope.srchresult=false;
					$scope.showSrch=false;
					$scope.isActive = function(vw){
						console.log("View: "+vw);
						return (vw === $location.path()) ;
					}
					//var books=_.pluck(_BoB, 'name');
					//console.log(books);
					$scope.books = _BoB;
					
					$scope.onchgbook = function(){
						console.log("name:"+$scope.selBook);
						$scope.showLoad = true;
						$http.get($scope.selBook.loc).then(function(res){
							$scope.wbook = res.data;
							$scope.book = res.data;
							console.log("Content:"+res);
							$scope.showLoad = false;
							var tarr=_.pluck($scope.book, 'chapter');
							$scope.chapsarr = _.uniq(tarr);
							$scope.selChap =null;
							$scope.srchresult=false;
							$scope.showSrch=true;
							$scope.srchTxt='';
						});	
					}
					$scope.onchgchap = function(){
						$scope.showLoad = true;
						var cobj=_.where($scope.wbook,{chapter: $scope.selChap});
						$scope.book = cobj;
						$scope.showLoad = false;
						$scope.srchresult=false;
						$scope.srchTxt='';
					};	
					
					$scope.search = function(){
						$scope.showLoad=true;
						searchScripture();
					}
					
					
					
					function searchScripture(){
							$q.all([doSearch("data/bob/scriptures_part1.txt"),
							        doSearch("data/bob/scriptures_part2.txt"),
							        doSearch("data/bob/scriptures_part3.txt"),
							        doSearch("data/bob/scriptures_part4.txt"),
							        doSearch("data/bob/scriptures_part5.txt"),
							        doSearch("data/bob/scriptures_part6.txt")
							])
							.then(function(data){
								var res=_.union(data[0],data[1],data[2],data[3],data[4],data[5]);
								$scope.book= res;
								$scope.srchresult=true;
								$scope.showLoad=false;
								$scope.srchrescount=res.length;
								$scope.selBook=null;
								$scope.selChap=null;
							})
							;
					}
					
					 function doSearch(txtfile){
						var result =[];
						var arr;
						console.log("file:"+txtfile);
						
						return $http.get(txtfile).then(function(res){
							var items = res.data;
							var srchExp= new RegExp("("+$scope.srchTxt+")", "gi");
							var num =0;
							for(var n=0; n< items.length; n++){
								var aRec= items[n];
								if(aRec.text){
									arr = aRec.text.match(srchExp);
									if(arr != null ){
										//console.log("Matches:"+arr.length+" data:"+arr);
										num = num + arr.length;
										result.push(aRec);
										//console.log("Hits: ["+num+"]-"+aRec.book+":"+aRec.text);
									}
								}
							}
							//console.log("End of Search...");
							return result;
						});
					}
					
					
					
				});
				
