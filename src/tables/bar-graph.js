import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryLabel
} from 'victory';

export const BarGraph = ({
  data,
  theme,
  xAxisLabel,
  yAxisLabel,
  yAxisValues,
  xAxisLabelDy,
  domainPadding
}) => {
  return !data ? null : (
    <VictoryChart theme={theme} domainPadding={domainPadding}>
      <VictoryAxis
        label={xAxisLabel}
        fixLabelOverlap
        tickValues={yAxisValues}
        axisLabelComponent={<VictoryLabel dy={10}/>}
      />
      <VictoryAxis
        label={yAxisLabel}
        dependentAxis
        fixLabelOverlap
        tickValues={yAxisValues}
        axisLabelComponent={<VictoryLabel dy={xAxisLabelDy}/>}
      />
      <VictoryBar
        data={data}
        barRatio={0.8}
        style={{ data: { fill: "#c43a31" } }}
      />
    </VictoryChart>
  );
};

export default BarGraph;
