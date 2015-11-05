angular.module('app').factory('ConfigRepository',	function($http) {	
	return	{
		getAppConfiguration: function()	{
			return $http.get('/placeshare/metadata').then(
				function(response){
					//console.log('got response of metadata',	response.data);
					return response.data
				},
				function(rejection)	{
					console.log('request for metadata	failed');
				});
		}
	};	
});
angular.module('app').factory('GetPlaceShareStatusRepository',	function($http) {	
	return	{
		getPlaceShareStatus: function()	{
			return $http.get('/placeshare').then(
				function(response){
					//console.log('got response of placeshare',	response.data);
					return response.data
				},
				function(rejection)	{
					console.log('request for placeshare	failed');
				});
		}
	};	
});


angular.module('app').factory('PlaceshareaddRepository',	function($http) {	
	return	{
		Placeshareadd: function(url)	{
			return $http.put(url).then(
				function(response){

					debugger;
					console.log('got response of placeshare!!',	response.data);



					return response.data
				},
				function(rejection)	{
					console.log('request for placeshare	failed');
				});
		},PlaceshareDel: function(url)	{
			return $http.delete(url).then(
				function(response){
					//console.log('got response of placeshare',	response.data);
					return response.data
				},
				function(rejection)	{
					console.log('request for placeshare	failed');
				});
		}
	};	
});

angular.module('app').factory('ContextRepository',	function($rootScope) {	
	var _IsDemoStart = true;
	var instance =
	{
		notify: function() {
            $rootScope.$emit('notifying-service-event');
        },
		IsDemoStart: function()	{
				console.log('IsDemoStart : ',_IsDemoStart);
				return _IsDemoStart;
		},
		SetDemoStart: function()	{
				_IsDemoStart = !_IsDemoStart;
				instance.notify();
				console.log('SetDemoStart : ',_IsDemoStart);
		},
		subscribe: function(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        }
		
	};	
	return instance;
});
