angular.module('app').controller('AdminCtrl', function(PlaceshareaddRepository,ContextRepository) {
  var self = this;
  
  

  self.myModel = { IsStartDemo: true,NumberOfPersonToAdd: 10,DinnigRoomID:1, amount:0, room_number:0 }; 
  

  self.startDemo = function(){
	  ContextRepository.SetDemoStart();
  }
  
  self.addDinningPerson = function addDinningPerson() {
	  debugger;
            var aPromiseAdd =PlaceshareaddRepository.Placeshareadd('/placeshareadd/' + getNumOfPersons() + '/' + getRandomDinningRoom());
	    
			aPromiseAdd.then(function(successValue){
				 $timeout(function() {
					 console.log('getData TimeOut : ');
					addDinningPerson();
				}, 500);
		   });
          }
		  
self.addDinningPersonWithParams = function addDinningPersonWithParams() {
	  debugger;
	        //var aPromiseAdd =PlaceshareaddRepository.Placeshareadd('/placeshareadd/1222/1');
			var params = '/placeshareadd/' + self.myModel.amount + '/' + self.myModel.room_number;
			console.log(params);
             var aPromiseAdd =PlaceshareaddRepository.Placeshareadd(params);
			 //'/placeshareadd/' + self.myModel.amount + '/' + self.myModel.room_number);
	    
			aPromiseAdd.then(function(successValue){
				console.log('success!!!!!!!!!!!');
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
