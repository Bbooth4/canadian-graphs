import { both, test, prop, filter, propOr, propEq, compose } from 'ramda';

const isLastQuarter = /^\d{4}-10/;

export const setLow = (a, b) => a > b ? prop('VALUE', b) : prop('VALUE', a);

export const setHigh = (a, b) => a > b ? prop('VALUE', a) : propOr(prop('VALUE', a), 'VALUE', b);

export const filterWholePop = filter(
  both(
    propEq('GEO', 'Canada'),
    compose(test(isLastQuarter), prop('REF_DATE'))
  )
);
