angular.module('app').controller('HomeCtrl', function(ConfigRepository,GetPlaceShareStatusRepository,PlaceshareaddRepository,$q,$timeout,$interval) {
  var self = this;
  self.greeting = 'World';
  
  //self.placeShareStatus = [{name: 'AA',status: 'Y',upDate: new Date(),imageUrl: '../images/R.jpg'},{name: 'BB',status: 'Y',upDate: new Date(),imageUrl: '../images/Y.jpg'},{name: 'CC',status: 'Y',upDate: new Date(),imageUrl: '../images/Y.jpg'}];
   
   getData = function() {
	   var aPromise =[ConfigRepository.getAppConfiguration(),GetPlaceShareStatusRepository.getPlaceShareStatus()];
	    
		aPromise[0].then(function(successValue){
	   
		  self.DinningRoomList = successValue; 
		   console.log('DinningRoomList : ',self.DinningRoomList);
		   return successValue;
	   }
	   
	   );
	   
	aPromise[1].then(function(successValue){
			self.placeShareCurrentStatus = successValue;
			console.log('getPlaceShareStatus : ',self.DinningRoomList);

	   });
	  
	$q.all(aPromise).then(function(successValue){
		   self.placeShareStatus = [];
		   self.DinningRoomList.forEach (function(room)
			{ 
				console.log('XXXX : ',self.placeShareStatus);
				
				self.placeShareCurrentStatus.forEach(function(status)
				{
					if (status.roomID  == room.code) {
						var Light = 'G';
						if (status.currentOccupancy > room.small) {
							if (status.currentOccupancy > room.medium) {
								Light = 'R';
							}
							else {
								Light = 'Y';
							}

						}

						self.placeShareStatus.push({
							name: room.name,
							status: Light,
							upDate: status.lastUpdDate,
							imageUrl: '../images/' + Light + '.jpg',
                            freePlaces:room.capacity - status.currentOccupancy
						});

					}
				});
			});
		   console.log('placeShareStatusADI : ',self.placeShareStatus);
		   $timeout(function() {
					console.log('getData TimeOut : ');
					getData();
				}, 1500);
	   });
   };
   
     
   
   function addDinningPerson() {
            var aPromiseAdd =PlaceshareaddRepository.Placeshareadd('/placeshareadd/' + getNumOfPersons() + '/' + getRandomDinningRoom());
	    
			aPromiseAdd.then(function(successValue){
				 $timeout(function() {
					 console.log('getData TimeOut : ');
					addDinningPerson();
				}, 500);
		   });
          }
   
   
   function delDinningPerson() {
            var aPromiseAdd =PlaceshareaddRepository.PlaceshareDel('/placeshareadd/' + getNumOfPersons() + '/' + getRandomDinningRoom());
	    
			aPromiseAdd.then(function(successValue){
				 $timeout(function() {
					 console.log('getData TimeOut : ');
					delDinningPerson();
				}, 1000);
		   });
          }
		  
   
   
   function getRandomDinningRoom(){
    return Math.floor((Math.random()*3)+1);
   }
  
   function getNumOfPersons(){
    return Math.floor((Math.random()*10)+1);
   }
   
   getData();
   addDinningPerson();
   delDinningPerson();
    self.model = {
    text: ''
  };


    self.model = {
    text: ''
  };

    //self.TrafficLights = function(room) {
		//if (self.placeShareStatus && self.placeShareStatus[room - 1]) {
		//	var roomData = self.placeShareStatus[room - 1]
		//	return '../images/' + roomData.status + '.jpg';
		//}
		//return '../images/Y.jpg';
    //}

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
