angular.module('app').controller('HomeCtrl', function(ConfigRepository) {
  var self = this;
  self.greeting = 'World';
  self.DinningRoomList = ConfigRepository.getAppConfiguration();
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
