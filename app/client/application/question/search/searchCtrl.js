(function(){

		angular.module('QforQuants')
			.controller('searchController',function(searchCount,searchList,searchText,searchService,$state){
			
			var search           = this;
			search.newSearchText = '';
			search.list          = searchList;
			search.count         = searchCount;
			search.searchText    = searchText;
			search.pages         = 0;
			search.firstPage     = 1;
			search.lastPage      = 0;
			search.currentPage   = 1;

			search.createPages = function(){

				var pageCount = search.count / 15;
				var range = [];
				for(var i = 0; i < pageCount ; i++) {
				  range.push( i+1 );
				}

				search.lastPage = range.length;
				return range;
			};

			search.pages = search.createPages();

			search.onClickPageButton = function(page){
				search.currentPage = page ; 

				var promise = searchService.SearchQuestions(search.searchText,page);

				promise.then(function(result){
					search.list = result;
				}).catch(function(error){
					toastr.error(error);
				});
			}

			search.onClickNextButton = function(){
				if(search.currentPage < search.lastPage){
					
					search.currentPage ++;
					var promise = searchService.SearchQuestions(search.searchText,search.currentPage);

					promise.then(function(result){
						search.list = result;
					}).catch(function(error){
						toastr.error(error);
					});
				}
			};

			search.onClickPrevButton = function(){
				if(search.currentPage > search.firstPage){
					
					search.currentPage --;

					var promise = searchService.SearchQuestions(search.searchText,search.currentPage);

					promise.then(function(result){
						search.list = result;
					}).catch(function(error){
						toastr.error(error);
					});
				}
			};

			search.onClickSearch = function(){
				if(search.newSearchText){
					$state.go('Home.Search',{ text : search.newSearchText});
				}
			};
		});
})();