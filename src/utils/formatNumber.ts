import numeral from 'numeral';

export const formatNumber = (number: number | string, decimals?: number) => {
  if (typeof number === 'string' && isNaN(parseFloat(number))) return number;

  number = typeof number === 'string' ? parseFloat(number) : number;

  if (number < 1e-7) {
    if (decimals === 0) return '0';
    return '0.0';
  }

  if (number >= 1) {
    if (number > 99999) {
      if (decimals === 0) return numeral(number).format('0a');
      return numeral(number).format('0.[0]a');
    }

    if (number > 9999) {
      if (decimals === 0) return numeral(number).format('0a');
      return numeral(number).format('0.[00]a');
    }

    if (decimals === 0) return numeral(number).format('0a');
    return numeral(number).format('0.[00]');
  }
  if (number < 0.001) {
    if (decimals === 0) return numeral(number).format('0');
    return numeral(number).format('0.0[0000]');
  }

  if (number < 1) {
    return numeral(number).format('0.00[00]');
  }

  if (decimals === 0) return numeral(number).format('0');

  return numeral(number).format('0.[00]');
};
