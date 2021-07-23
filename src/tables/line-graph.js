import { match, remove, subtract } from 'ramda';
import {
  VictoryLine,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryLabel
} from 'victory';
import { setLow, setHigh } from '../helpers';

const formatLine = array => {
  const arr = array.map((e, i, a) => ({
    x: match(/^\d{4}/, e.REF_DATE),
    y: subtract(setHigh(e, a[i+1]), setLow(e, a[i+1]))
  }));
  return remove(array.length - 1, 1, arr);
};

export const LineGraph = ({ data }) => {
  const formattedData = data ? formatLine(data) : null;
  return !formattedData ? null : (
    <VictoryChart
      scale={{ x: "time" }}
      domainPadding={{ x: 25 }}
      theme={VictoryTheme.material}
    >
      <VictoryAxis
        label="Years"
        offsetY={50}
        fixLabelOverlap
        axisLabelComponent={<VictoryLabel dy={20}/>}
        tickValues={[1971, 1980, 1990, 2000, 2010, 2020]}
      />
      <VictoryAxis
        label="Death Change (in Thousands)"
        dependentAxis
        fixLabelOverlap
        tickValues={[-5000, 0, 5000, 10000, 15000]}
        axisLabelComponent={<VictoryLabel dy={-40}/>}
      />
      <VictoryLine
        data={formattedData}
        style={{ labels: { fontSize: '6px' } }}
        candleColors={{ positive: "#06c20f", negative: "#f20f1d" }}
      />
    </VictoryChart>
  );
};

export default LineGraph;
