angular.module('app').factory('ConfigRepository',	function() {	
	return	{
		getAppConfiguration: function()	{
			return[
				{DrID:1,DrName:'AAA',MaxCapacity:523,SmallLimit:125,MediumLimit:347},
				{DrID:2,DrName:'BBB',MaxCapacity:256,SmallLimit:33,MediumLimit:157}
			];
		}
	};	
});