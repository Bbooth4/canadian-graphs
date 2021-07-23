import { prop, match, divide, propOr } from 'ramda';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryCandlestick
} from 'victory';
import { setLow, setHigh } from '../helpers';

const formatCandlestick = array => array.map((e, i, a) => ({
  y: 'y',
  x: match(/^\d{4}/, e.REF_DATE),
  low: divide(setLow(e, a[i+1]), 1000),
  high: divide(setHigh(e, a[i+1]), 1000),
  open: divide(prop('VALUE', e), 1000),
  close: divide(propOr(prop('VALUE', e), 'VALUE', a[i+1]), 1000)
}));

export const CandlestickDeathsTable = ({ xAxis, deaths }) => !deaths ? null : (
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
      label="Total Deaths (in Thousands)"
      dependentAxis
      fixLabelOverlap
      tickValues={xAxis}
      axisLabelComponent={<VictoryLabel dy={-30}/>}
    />
    <VictoryCandlestick
      data={formatCandlestick(deaths)}
      style={{ labels: { fontSize: '6px' } }}
      candleColors={{ positive: "#06c20f", negative: "#f20f1d" }}
    />
  </VictoryChart>
);

export default CandlestickDeathsTable;
