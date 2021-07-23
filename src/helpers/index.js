import { prop, propOr } from 'ramda';

export const setLow = (a, b) => a > b ? prop('VALUE', b) : prop('VALUE', a);

export const setHigh = (a, b) => a > b ? prop('VALUE', a) : propOr(prop('VALUE', a), 'VALUE', b);
