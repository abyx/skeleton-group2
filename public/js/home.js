angular.module('app').controller('HomeCtrl', function(ConfigRepository,GetPlaceShareStatusRepository) {
  var self = this;
  self.greeting = 'World';
   var aPromise = ConfigRepository.getAppConfiguration();
    console.log('getAppConfiguration : ',aPromise);
   aPromise.then(function(successValue){
	   self.DinningRoomList =successValue;
	   console.log('DinningRoomList : ',self.DinningRoomList);}
	   );
  var aPromise = GetPlaceShareStatusRepository.getPlaceShareStatus();
    console.log('getPlaceShareStatus : ',aPromise);
   aPromise.then(function(successValue){
	   self.placeShareStatus =successValue;
	   console.log('getPlaceShareStatus : ',self.DinningRoomList);}
	   );
  self.model = {
    text: ''
  };
  
  
  self.model = {
    text: ''
  };

  self.buttonClicked = function() {
    if (self.model.text === '') {
      alert('Please enter text in the input field');
    } else {
      alert('Heya, ' + self.model.text);
    }
  };
});
