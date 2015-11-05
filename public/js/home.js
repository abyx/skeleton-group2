angular.module('app').controller('HomeCtrl', function(ConfigRepository,GetPlaceShareStatusRepository,PlaceshareaddRepository,ContextRepository,$q,$timeout,$scope,$interval) {
  var self = this;
    self.audio = new Audio('images/ding.wav');
    self.alert = false;
  
  //self.placeShareStatus = [{name: 'AA',status: 'Y',upDate: new Date(),imageUrl: '../images/R.jpg'},{name: 'BB',status: 'Y',upDate: new Date(),imageUrl: '../images/Y.jpg'},{name: 'CC',status: 'Y',upDate: new Date(),imageUrl: '../images/Y.jpg'}];
   
   ContextRepository.subscribe($scope,function(){
	   if(ContextRepository.IsDemoStart)
	   {
		   $timeout(function() {
					//console.log('getData TimeOut : ');
					getData();
				}, 1500);
				
			$timeout(function() {
					 //console.log('getData TimeOut : ');
					addDinningPerson();
				}, 500);
				
			$timeout(function() {
					 //console.log('getData TimeOut : ');
					delDinningPerson();
				}, 1000);
	   }
   })
   
   getData = function() {
	   console.log('ContextRepository.IsDemoStart : ' + ContextRepository.IsDemoStart());
	   
	   var aPromise =[ConfigRepository.getAppConfiguration(),GetPlaceShareStatusRepository.getPlaceShareStatus()];
	    
		aPromise[0].then(function(successValue){
	   
		  self.DinningRoomList = successValue; 
		   //console.log('DinningRoomList : ',self.DinningRoomList);
		   return successValue;
	   }
	   
	   );
	   
	aPromise[1].then(function(successValue){
			self.placeShareCurrentStatus = successValue;
			//console.log('getPlaceShareStatus : ',self.DinningRoomList);

	   });
	  
	$q.all(aPromise).then(function(successValue){
		   self.placeShareStatus = [];
		   self.DinningRoomList.forEach (function(room)
			{ 
				//console.log('XXXX : ',self.placeShareStatus);
				
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
							upDate: new Date(status.lastUpdDate).ToFormatString(),
							imageUrl: '../images/' + Light + '.jpg',
                            freePlaces:room.capacity - status.currentOccupancy
						});

                        alertOpenDR();

					}
				});
			});
			
			if(!ContextRepository.IsDemoStart())
			   {
				   return;
			   }
		   //console.log('placeShareStatusADI : ',self.placeShareStatus);
		   $timeout(function() {
					//console.log('getData TimeOut : ');
					getData();
				}, 1500);
	   });
   };
   
     
   
   function addDinningPerson() {
			if(!ContextRepository.IsDemoStart)
			{
			   return;
			}
            var aPromiseAdd =PlaceshareaddRepository.Placeshareadd('/placeshareadd/' + getNumOfPersons() + '/' + getRandomDinningRoom());
	    
			aPromiseAdd.then(function(successValue){
				 $timeout(function() {
					// console.log('getData TimeOut : ');
					addDinningPerson();
				}, 500);
		   });
          }
   
   
   function delDinningPerson() {
			if(!ContextRepository.IsDemoStart)
			{
			   return;
			}
            var aPromiseAdd =PlaceshareaddRepository.PlaceshareDel('/placeshareadd/' + getNumOfPersons() + '/' + getRandomDinningRoom());
	    
			aPromiseAdd.then(function(successValue){
				 $timeout(function() {
					// console.log('getData TimeOut : ');
					delDinningPerson();
				}, 1000);
		   });
          }
		  
   Date.prototype.ToFormatString = function() {
	   var yyyy = this.getFullYear().toString();
	   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
	   var dd  = this.getDate().toString();
	   var hh = this.getHours().toString();
	   var mi = this.getMinutes().toString();
	   var ss = this.getSeconds().toString();
	   return (dd[1]?dd:"0"+dd[0]) +  '/' + (mm[1]?mm:"0"+mm[0]) + '/' + yyyy + ' ' + (hh[1]?hh:"0"+hh[0]) + ':' + (mi[1]?mi:"0"+mi[0]) + ':' + (ss[1]?ss:"0"+ss[0]); // padding
  };
  
  

   
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

    function alertOpenDR() {
        if (!self.alert) return;
        var toAlert;
        toAlert = self.placeShareStatus.find(function (room) {
            return room.status == 'G'
        });
        if (toAlert) {
            self.audio.play()
            self.alert = false;
        };
    }
  self.buttonClicked = function() {
    if (self.model.text === '') {
      alert('Please enter text in the input field');
    } else {
      alert('Heya, ' + self.model.text);
    }
  };
});
