export const toDecimalMark = num => num.toLocaleString('en-US');

// toDecimalMark(12305030388.9087); // "12,305,030,388.909"

export const formatNumber = (number, n, x) => {
  const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\.' : '$'})`;
  return Number(number)
    .toFixed(Math.max(0, ~~n))
    .replace(new RegExp(re, 'g'), '$&.');
};

// formatNumber(3560283) ; 3.560.283

export const formatNumberByComma = (number, n, x) => {
  const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\.' : '$'})`;
  return Number(number)
    .toFixed(Math.max(0, ~~n))
    .replace(new RegExp(re, 'g'), '$&,');
};

// formatNumberByComma(3560283) ; 3,560,283

export const formatMoney = (number = 0, n, x) => {
  const UNIT = ['', ' K', ' triệu', ' tỉ'];
  let unitRank = 0;
  let tmpPrice = Math.abs(number);
  while (1) {
    tmpPrice = Number(tmpPrice) / 1000;
    unitRank += tmpPrice > 1 ? 1 : 0;
    if (tmpPrice < 1) break;
  }
  const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\.' : '$'})`;
  return `${number >= 0 ? '' : '-'}${Number(tmpPrice * 1000)
    .toFixed(1)
    .replace(new RegExp(re, 'g'), '$&,')}${UNIT[unitRank]}`;
};

export const formatOrdinalnumber = number => {
  return number < 10 ? `0${number}` : number;
};

// formatOrdinalnumber(1);   //01

export const isPowerOfFour = num => {
  let lg4 = Math.log(num) / Math.log(4);
  return lg4 === ~~lg4; // ~~(4.01) = 4 <=> Math.floor(4.01)
};

// isPowerOfFour(16)  => true

export const randomNumber = (min, max) => {
  return ~~(Math.random() * (max - min)) + min;
};

// randomNumber(1, 100) -> 11
