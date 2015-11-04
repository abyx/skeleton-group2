angular.module('app').factory('ConfigRepository',	function($http) {	
	return	{
		getAppConfiguration: function()	{
			return $http.get('/placeshare/metadata').then(
				function(response){
					console.log('got response of metadata',	response.data);
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
					console.log('got response of placeshare',	response.data);
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
					console.log('got response of placeshare',	response.data);
					return response.data
				},
				function(rejection)	{
					console.log('request for placeshare	failed');
				});
		},PlaceshareDel: function(url)	{
			return $http.delete(url).then(
				function(response){
					console.log('got response of placeshare',	response.data);
					return response.data
				},
				function(rejection)	{
					console.log('request for placeshare	failed');
				});
		}
	};	
});