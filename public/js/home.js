angular.module('app').controller('HomeCtrl', function(ConfigRepository,GetPlaceShareStatusRepository) {
  var self = this;
  self.greeting = 'World';
   var aPromise = ConfigRepository.getAppConfiguration();
    console.log('getAppConfiguration : ',aPromise);
   aPromise.then(function(successValue){
	   self.DinningRoomList = successValue;
	   console.log('DinningRoomList : ',self.DinningRoomList);}
	   ).then(function(successValue){
			self.placeShareStatus = successValue;
			console.log('getPlaceShareStatus : ',self.DinningRoomList);
			
			self.placeShareStatus = [{roomId:1, status:'G'}, {roomId:2, status:'R'} , {roomId:3, status:'Y'}];
			
			/*
			self.DinningRoomList.forEach (function(room)
			{ 
			successValue.forEach (
			function(status)
			{
					console.log('status : ',status);
			});
			});
			*/
	   });
  self.model = {
    text: ''
  };
  
  
  self.model = {
    text: ''
  };

    self.TrafficLights = function(roomId) {
        return  '../images/green.jpg';
    }

  self.buttonClicked = function() {
    if (self.model.text === '') {
      alert('Please enter text in the input field');
    } else {
      alert('Heya, ' + self.model.text);
    }
  };
});
