export const helpers = {
  convert,
  getImage,
};
function convert(value, unitToConvert) {
  var result;
  if (unitToConvert === 'C') {
    var fTemp = value;
    var fToCel = ((fTemp - 32) * 5) / 9;
    result = fToCel;
  } else {
    var cTemp = value;
    var cToFahr = (cTemp * 9) / 5 + 32;
    result = cToFahr;
  }
  return Math.round(result);
}
// const arrayOfImages = [
//   1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 29, 21, 22, 23,
//   24, 25, 26, 29, 33,
// ];
// function ifImageExists(val) {
//   console.log('this is val', val);
//   const res = arrayOfImages.find((element) => element === val);
//   if (!res) return 1;
//   return val;
// }

function getImage(val) {
  if (!val) return 'clear';
  if (val <= 5) return 'clear';
  else if (val <= 11) return 'cloudy';
  else if (val <= 18) return 'rainy';
  else if (val <= 29) return 'night';
  else return 'cloudy-night';
}
