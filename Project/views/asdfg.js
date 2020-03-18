function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
}


console.log(isValidDate("0000-00-00"));  // false
console.log(isValidDate("2015-01-40"));  // false
console.log(isValidDate("2016-11-25"));  // true
console.log(isValidDate("1970-01-01"));  // true = epoch
console.log(isValidDate("2016-02-29"));  // true = leap day
console.log(isValidDate("2013-02-29")); 	