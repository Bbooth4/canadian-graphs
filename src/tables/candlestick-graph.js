import {
  both,
  prop,
  test,
  match,
  divide,
  propEq,
  propOr,
  compose
} from 'ramda';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryCandlestick
} from 'victory';
import { setLow, setHigh } from '../helpers';

const isDate = /^\d{4}/;
const isLastQuarter = /^\d{4}-10/;

const formatDeaths = array => array.map((e, i, a) => ({
  y: 'y',
  x: match(isDate, e.REF_DATE),
  low: divide(setLow(e, a[i+1]), 1000),
  high: divide(setHigh(e, a[i+1]), 1000),
  open: divide(prop('VALUE', e), 1000),
  close: divide(propOr(prop('VALUE', e), 'VALUE', a[i+1]), 1000)
}));

const formatPopulation = array => array
  .filter(
    both(
      propEq('GEO', 'Canada'),
      compose(test(isLastQuarter), prop('REF_DATE'))
    )
  )
  .map((e, i, a) => ({
    y: 'y',
    x: match(isDate, e.REF_DATE),
    low: divide(setLow(e, a[i+1]), 1000000),
    high: divide(setHigh(e, a[i+1]), 1000000),
    open: divide(prop('VALUE', e), 1000000),
    close: divide(propOr(prop('VALUE', e), 'VALUE', a[i+1]), 1000000)
  }));

const formatData = {
  deaths: formatDeaths,
  population: formatPopulation
};

export const CandlestickGraph = ({ data, type, xAxisValues, xAxisLabel }) => !data ? null : (
  <VictoryChart
    scale={{ x: "time" }}
    domainPadding={{ x: 25 }}
    theme={VictoryTheme.material}
  >
    {console.log(data.filter(
      both(
        propEq('GEO', 'Canada'),
        compose(test(isLastQuarter), prop('REF_DATE'))
      )
    ))}
    <VictoryAxis
      label="Years"
      fixLabelOverlap
      axisLabelComponent={<VictoryLabel dy={20}/>}
      tickValues={[1971, 1980, 1990, 2000, 2010, 2020]}
    />
    <VictoryAxis
      label={xAxisLabel}
      dependentAxis
      fixLabelOverlap
      tickValues={xAxisValues}
      axisLabelComponent={<VictoryLabel dy={-30}/>}
    />
    <VictoryCandlestick
      data={formatData[type](data)}
      style={{ labels: { fontSize: '6px' } }}
      candleColors={{ positive: "#06c20f", negative: "#f20f1d" }}
    />
  </VictoryChart>
);

export default CandlestickGraph;
