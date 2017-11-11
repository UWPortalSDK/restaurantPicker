angular.module('portalApp')

.service('SharedDataService', function(){
	var Filters = {
        selectedRadius : "Walkable",
    	openNow : "Yes",
    	price : "$$$$",
    	categories : "",
    	vegetarian : "No",
    	vegan : "No",
    	moods:[
        	{mood: "Thirsty"},
        	{mood: "Lazy"},
        	{mood: "Cranky"},
        	{mood: "Hungover"},
        	{mood: "Stressed"},
        	{mood: "Happy"},
        	{mood: "Party!!"}
        ],
        prices:[
        	{price: "$"},
        	{price: "$$"},
        	{price: "$$$"},
        	{price: "$$$$"}
    	],
        dropDownData:[
        {radius: "Walkable", openNow: "Open now", vegetarian: "Yes", vegan: "Yes"},
        {radius: "Bussable", openNow: "Open and closed now", vegetarian: "No", vegan: "No"},
    	]
    };
    return Filters;
})
.controller('restaurantPickerCtrl', ['$scope', '$http', '$q', 'sampleOpenDataFactory', 'SharedDataService', function($scope, $http, $q, sampleOpenDataFactory, SharedDataService) {
	
    // Set default view and variables
    $scope.portalHelpers.showView('restaurantPickerMain.html', 1);
    $scope.loading = sampleOpenDataFactory.loading;
    $scope.searchData = sampleOpenDataFactory.searchData;
    $scope.mockData = sampleOpenDataFactory.mockData;
    $scope.item = {
    	value:''
    };
    $scope.filters = SharedDataService;

    // Handle click to display a view
    $scope.feelingLucky = function(viewname) {
         // initialize the service
    sampleOpenDataFactory.init($scope);

    // watch for changes in the loading variable
    $scope.$watch('loading.value', function() {
        // if loading
        if ($scope.loading.value) {
            // show loading screen in the first column, and don't append it to browser history
            $scope.portalHelpers.showView('loading.html', 1, false);
            // show loading animation in place of menu button
            $scope.portalHelpers.toggleLoading(true);
        } else {
            $scope.portalHelpers.showView(viewname, 1);
            $scope.portalHelpers.toggleLoading(false);
        }
    });                                                
        $scope.portalHelpers.showView(viewname, 1);
    };
    
    $scope.changePage = function(viewname){
    	$scope.portalHelpers.showView(viewname, 1);
    };
    
     $scope.showDetails = function (item) {
        // Set which item to show in the details view
        $scope.item.value = item;
        // Show details view in the second column
        $scope.portalHelpers.showView('restaurantPickerDetails.html', 1);
    };
}])

// Factory maintains the state of the widget
.factory('sampleOpenDataFactory', ['$http', '$rootScope', '$filter', '$q', 'SharedDataService', function($http, $rootScope, $filter, $q, SharedDataService) {
    

   	var radius = SharedDataService.selectedRadius;
    var price = SharedDataService.price;
    var openNow = SharedDataService.openNow;
    var mood = SharedDataService.categories;
    var vegetarian = SharedDataService.vegetarian;
    var vegan = SharedDataService.vegan;
    
    var initialized = {
        value: false
    };

    // Your variable declarations
    var loading = {
        value: true
    };
    var searchData = {
        value: null
    };
    var mockData = {
        value: null
    };

    var sourcesLoaded = 0;

    var init = function($scope) {
        if (initialized.value)
            return;
        initialized.value = true;

        // Place your init code here:

        // OPEN DATA
       $scope.portalHelpers.invokeServerFunction({functionName:'getOpenData', uniqueNameId:'restaurantPicker'}, {r:radius, p:price, o:openNow, m:mood, veg:vegetarian, v:vegan}).then(function(result) {
            console.log('getsearchdata data:', result);
            searchData.value = result.businesses;
            sourceLoaded();
        });


        // MOCK DATA          
        $scope.portalHelpers.invokeServerFunction({functionName:'getMockData', uniqueNameId:'restaurantPicker'}).then(function(result) {
            console.log('getmockdata data:', result);
            mockData.value = result.businesses;
            sourceLoaded();
        });

    };

    function sourceLoaded() {
        sourcesLoaded++;
        if (sourcesLoaded > 1)
            loading.value = false;
    }

    return {
        init: init,
        loading: loading,
        searchData: searchData,
        mockData: mockData
    };

}]);