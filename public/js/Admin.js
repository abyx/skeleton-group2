angular.module('app').controller('AdminCtrl', function(PlaceshareaddRepository,ContextRepository) {
  var self = this;
  
  

  self.myModel = { IsStartDemo: true,NumberOfPersonToAdd: 10,DinnigRoomID:1, amount:0, room_number:0 }; 
  

  self.startDemo = function(){
	  ContextRepository.SetDemoStart();
  }
  
		  
self.addDinningPersonWithParams = function addDinningPersonWithParams() {
 
			var params = '/placeshareadd/' + self.myModel.amount + '/' + self.myModel.room_number;
			console.log(params);
             var aPromiseAdd =PlaceshareaddRepository.Placeshareadd(params);
	    
			aPromiseAdd.then(function(successValue){
				console.log('success!!!!!!!!!!!');
		   });
          }
		  
		  self.deleteDinningPersonWithParams = function deleteDinningPersonWithParams() {
 
			var params = '/placeshareadd/' + self.myModel.amount + '/' + self.myModel.room_number;
			console.log(params);
             var aPromiseAdd =PlaceshareaddRepository.PlaceshareDel(params);
	    
			aPromiseAdd.then(function(successValue){
				console.log('success!!!!!!!!!!!');
		   });
          }
   
   
   function delDinningPerson() {
            var aPromiseAdd =PlaceshareaddRepository.PlaceshareDel('/placeshareadd/' + getNumOfPersons() + '/' + getRandomDinningRoom());
	    
		/*	aPromiseAdd.then(function(successValue){
				 $timeout(function() {
					 console.log('getData TimeOut : ');
					delDinningPerson();
				}, 1000);
		   });*/
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
