import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryLabel
} from 'victory';

const formatData = (type, data) => {
  switch(type) {
    case 'percent':
      return data.map(({ x, cases, deaths }) => ({
        x,
        y: (deaths / cases) * 100
      }));
    default:
      return data
  };
};

export const BarGraph = ({
  data,
  type,
  theme,
  xAxisLabel,
  yAxisLabel,
  yAxisValues,
  xAxisLabelDy,
  domainPadding
}) => {
  const formattedData = formatData(type, data);
  return !formattedData ? null : (
    <VictoryChart theme={theme} domainPadding={domainPadding}>
      <VictoryAxis
        label={xAxisLabel}
        tickValues={yAxisValues}
        axisLabelComponent={<VictoryLabel dy={10}/>}
      />
      <VictoryAxis
        label={yAxisLabel}
        dependentAxis
        tickValues={yAxisValues}
        axisLabelComponent={<VictoryLabel dy={xAxisLabelDy}/>}
      />
      <VictoryBar
        data={formattedData}
        barRatio={0.8}
        style={{ data: { fill: "#c43a31" } }}
      />
    </VictoryChart>
  );
};

export default BarGraph;
