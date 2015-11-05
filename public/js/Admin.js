angular.module('app').controller('AdminCtrl', function(PlaceshareaddRepository,ContextRepository) {
  var self = this;
  
  self.myModel = { IsStartDemo: true,NumberOfPersonToAdd: 10,DinnigRoomID:1 }; 
  
  self.startDemo() = function(){
	  ContextRepository.IsDemoStart;
  }
  
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
