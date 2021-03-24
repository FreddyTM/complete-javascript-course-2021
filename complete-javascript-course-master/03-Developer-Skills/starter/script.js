// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    /* value: Number(prompt('Degrees celsius')), */
    value: 10,
  };
  const kelvin = measurement.value + 273;
  return kelvin;
};
console.log(measureKelvin());

const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeNew = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
console.log(amplitudeNew);

function printForecast(temps) {
  let forecast = '';
  for (let i = 0; i < temps.length; i++) {
    forecast = forecast + `... ${temps[i]}ºC in ${i + 1} days `;
  }
  forecast += '...';
  return forecast;
}

console.log(printForecast([17, 21, 23]));
console.log(printForecast([12, 5, -5, 0, 4]));
console.log(printForecast);
