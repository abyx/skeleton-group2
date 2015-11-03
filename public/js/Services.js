angular.module('app').factory('ConfigRepository',	function($http) {	
	return	{
		getAppConfiguration: function()	{
			return $http.get('/placeshare/metadata').then(
				function(response){
					console.log('got response',	response.data);
					return response.data
				},
				function(rejection)	{
					console.log('request	failed');
				});
		}
	};	
});