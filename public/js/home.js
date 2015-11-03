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

    self.placeShareStatus = [{roomId:1, status:'G',name:'main'}, {roomId:2, status:'R',name:'aviv'} , {roomId:3, status:'Y',name:'TA'}];


    self.model = {
    text: ''
  };

    self.TrafficLights = function(room) {
        var roomData = self.placeShareStatus[room - 1]
        return '../images/' +  roomData.status +'.jpg';
    }

    self.DiningRoomNames = function(room) {
        return self.placeShareStatus[room - 1].name
    }

  self.buttonClicked = function() {
    if (self.model.text === '') {
      alert('Please enter text in the input field');
    } else {
      alert('Heya, ' + self.model.text);
    }
  };
});
