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