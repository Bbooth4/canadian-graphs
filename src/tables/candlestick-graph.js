import {
  prop,
  match,
  divide,
  propOr,
  remove,
  compose,
  multiply
} from 'ramda';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryCandlestick
} from 'victory';
import { setLow, setHigh, filterWholePop } from '../helpers';

const isDate = /^\d{4}/;

const formatDeaths = array => array.map((e, i, a) => ({
  y: 'y',
  x: match(isDate, e.REF_DATE),
  low: divide(setLow(e, a[i+1]), 1000),
  high: divide(setHigh(e, a[i+1]), 1000),
  open: divide(prop('VALUE', e), 1000),
  close: divide(propOr(prop('VALUE', e), 'VALUE', a[i+1]), 1000)
}));

const formatPopulation = compose(
  arr => arr.map((e, i, a) => ({
    y: 'y',
    x: match(isDate, e.REF_DATE),
    low: divide(setLow(e, a[i+1]), 1000000),
    high: divide(setHigh(e, a[i+1]), 1000000),
    open: divide(prop('VALUE', e), 1000000),
    close: divide(propOr(prop('VALUE', e), 'VALUE', a[i+1]), 1000000)
  })),
  filterWholePop
);

const formatRelative = ({ deaths, population }) => compose(
  arr => arr.map((e, i, a) => ({
    y: 'y',
    x: match(isDate, e.REF_DATE),
    low: multiply(100, divide(
      setLow(deaths[i], deaths[i+1]),
      setLow(e, a[i+1])
    )),
    high: multiply(100, divide(
      setHigh(deaths[i], deaths[i+1]),
      setHigh(e, a[i+1])
    )),
    open: multiply(100, divide(
      prop('VALUE', deaths[i]),
      prop('VALUE', e)
    )),
    close: multiply(100, divide(
      propOr(prop('VALUE', deaths[i]), 'VALUE', deaths[i+1]),
      propOr(prop('VALUE', e), 'VALUE', a[i+1])
    ))
  })),
  remove(0, 1),
  filterWholePop
)(population);

const formatData = (type, data) => {
  switch(type) {
    case 'deaths':
      return formatDeaths(data);
    case 'relative':
      return formatRelative(data);
    case 'population':
      return formatPopulation(data);
    default:
      return [];
  };
};

export const CandlestickGraph = ({ data, type, render, xAxisValues, xAxisLabel }) => render ? null : (
  <VictoryChart
    scale={{ x: "time" }}
    domainPadding={{ x: 25 }}
    theme={VictoryTheme.material}
  >
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
      data={formatData(type, data)}
      style={{ labels: { fontSize: '6px' } }}
      candleColors={{ positive: "#06c20f", negative: "#f20f1d" }}
    />
  </VictoryChart>
);

export default CandlestickGraph;
