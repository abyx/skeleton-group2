var IsDate = function(date)
 {
	var allowBlank = true;
    var minYear = 1902;
    var maxYear = (new Date()).getFullYear();

    var errorMsg = "";

    // regular expression to match required date format
    re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

    if(field.value != '') {
      if(regs = field.value.match(re)) {
        if(regs[1] < 1 || regs[1] > 31) {
          errorMsg = "Invalid value for day: " + regs[1];
        } else if(regs[2] < 1 || regs[2] > 12) {
          errorMsg = "Invalid value for month: " + regs[2];
        } else if(regs[3] < minYear || regs[3] > maxYear) {
          errorMsg = "Invalid value for year: " + regs[3] + " - must be between " + minYear + " and " + maxYear;
        }
      } else {
        errorMsg = "Invalid date format: " + field.value;
      }
    } else if(!allowBlank) {
      errorMsg = "Empty date not allowed!";
    }

    if(errorMsg != "") {
      return false;
    }

    return true;
 }
 
 var IsdiningRoom = function(id)
 {
	 var RetValue = false
	 if(!isNaN(id))
	 {
		 if(id> 0 && id< 3)
		 {
			 RetValue = true;
		 }
	 }
	
	return RetValue;	
 }
  
module.exports.IsDate = IsDate;
module.exports.IsdiningRoom = IsdiningRoom;