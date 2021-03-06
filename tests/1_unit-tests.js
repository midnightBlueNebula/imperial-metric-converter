/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(Number(convertHandler.getNum(input)),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '1.5km';
      assert.equal(Number(convertHandler.getNum(input)),1.5);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '1/3mi';
      assert.approximately(convertHandler.getNum(input),1/3,0.1);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '1.5/3kg';
      assert.approximately(convertHandler.getNum(input),(1.5/3).toFixed(5),0.1);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '1.5.1L';
      assert.equal(convertHandler.getNum(input),'?');
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = '?$L';
      assert.equal(convertHandler.getNum(input),NaN);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        //assert
        assert.equal(convertHandler.getUnit(ele),ele||ele.toLowerCase()||ele.toUpperCase());
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var units = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      var input = 'kq';
      assert.notInclude(units,convertHandler.getUnit(input))
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','L','mi','km','lbs','kg'];
      var expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
      var input = ['gal','L','mi','km','lbs','kg'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach((d,i)=>{
        assert.equal(convertHandler.spellOutUnit(d),expect[i]);
      })
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 19;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [1,'L'];
      var expected = 0.26417;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [1,'mi'];
      var expected = 1.60934;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [1,'km'];
      var expected = 0.62137;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [1,'lbs'];
      var expected = 0.45359;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [1,'kg'];
      var expected = 2.20462;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
  });

});