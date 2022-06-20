/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  
  this.getNum = function(input) {
    let result =  "";
    if(input.match(/\.{2}/) || input.match(/\/{2}/)){
      return '?';
    }
    for(let i=0; i<input.length; ++i){
      if(input[i].match(/\d/) || input[i]=='/' || input[i]=='.' || input[i].match(/\W/)){
        /*if(input.slice(0,i).match(/[a-z]/g) || input.slice(0,i).match(/[A-Z]/g)){
          continue;
        }
        
        else if(input[i]=='.' && result.match(/\./) && result.match(/\//)){
          continue;
        }
        
        else if(input[i]=='/' && result.match(/\//) && result.match(/\./)){
          continue;
        }
        
        else{
          result += input[i];
        }*/
        result += input[i];
      }
    }
    if(result.match(/\//)){
      let res = result.split(/\//);
      let test = ""+(res[0] / res[1])+"";
      let i = test.indexOf('.')+1;
      if(test.length-i>5){
        return (res[0] / res[1]).toFixed(5);
      }
      return (res[0] / res[1]);
    }
    
    else if(result.match(/\./)){
      let i = result.indexOf('.')+1;
      if(result.length-i>5){
        return Number(result).toFixed(5);
      }
    }
    
    
    return Number(result);
  };
  
  this.getUnit = function(input) {
    let result = input.replace(/\W/g,"");
    if(result.replace(/\d/g,"")=='l'){
      return result.replace(/\d/g,"").toUpperCase();
    }
    
    else if(result.replace(/\d/g,"")=='L'){
      return result.replace(/\d/g,"");
    }
    
    else{
      return result.replace(/\d/g,"").toLowerCase();
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit){
      case 'km'   : return 'mi'         ;    break;
      case 'mi'   : return 'km'         ;    break;
      case 'gal'  : return 'L'          ;    break;
      case 'L'    : return 'gal'        ;    break;
      case 'lbs'  : return 'kg'         ;    break;
      case 'kg'   : return 'lbs'        ;    break;
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit){
      case 'km'   : return 'kilometers' ;    break;
      case 'mi'   : return 'miles'      ;    break;
      case 'gal'  : return 'gallons'    ;    break;
      case 'L'    : return 'liters'     ;    break;
      case 'lbs'  : return 'pounds'     ;    break;
      case 'kg'   : return 'kilograms'  ;    break;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch(initUnit){
      case 'km'   :   return (initNum / miToKm ).toFixed(5)     ;    break;
      case 'mi'   :   return (initNum * miToKm ).toFixed(5)     ;    break;
      case 'gal'  :   return (initNum * galToL ).toFixed(5)     ;    break;
      case 'L'    :   return (initNum / galToL ).toFixed(5)     ;    break;
      case 'lbs'  :   return (initNum * lbsToKg).toFixed(5)     ;    break;
      case 'kg'   :   return (initNum / lbsToKg).toFixed(5)     ;    break;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var _num = (""+initNum+"").replace(/\./,"");
    var testNum = _num.replace(/\//,"");
    if(testNum.match(/\D/) && typeof this.spellOutUnit(initUnit)!=='undefined'){
      return 'invalid number';
    }
    else if(typeof this.spellOutUnit(initUnit)==='undefined' && testNum.match(/\D/) ){
      return 'invalid number and unit';
    }
    else if(typeof this.spellOutUnit(initUnit)==='undefined'){
      return 'invalid unit';
    }
    else{
      return "" + initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    }
  };
  
}

module.exports = ConvertHandler;
