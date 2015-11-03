angular.module('app').controller('HomeCtrl', function(ConfigRepository,GetPlaceShareStatusRepository) {
  var self = this;
  self.greeting = 'World';
   var aPromise =[ConfigRepository.getAppConfiguration(),GetPlaceShareStatusRepository.getPlaceShareStatus()];
   console.log('getAppConfiguration : ',aPromise);
   aPromise[0].then(function(successValue){
	   self.DinningRoomList = successValue;
	   console.log('DinningRoomList : ',self.DinningRoomList);
	   return successValue;
	   }
	   
	   );
	   
	aPromise[1].then(function(successValue){
			self.placeShareCurrentStatus = successValue;
			console.log('getPlaceShareStatus : ',self.DinningRoomList);
<<<<<<< HEAD
			
			//self.placeShareStatus = [{roomId:1, status:'G'}, {roomId:2, status:'R'} , {roomId:3, status:'Y'}];
=======

>>>>>>> 213fd168531a0271ae3c8fcb0a6449c47fb8efbb
			
			
			
		
	   });
	   
	   Promise.all(aPromise).then(function(successValue){
		   self.placeShareStatus = [];
		   self.DinningRoomList.forEach (function(room)
			{ 
				console.log('XXXX : ',self.placeShareStatus);
				
				self.placeShareCurrentStatus.forEach(function(status)
				{
					if (status.roomID  == room.code)
					{
						var Light = 'G';
						if(status.currentOccupancy > room.small)
						{
							if(status.currentOccupancy > room.medium)
							{
								Light = 'R';
							}
							else
							{
								Light = 'Y';
							}
							
						}
						
						self.placeShareStatus.push({name:room.name,status:Light,upDate:status.lastUpdDate});
					}
				});
			});
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
