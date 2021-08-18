import './App.css';
import { useAsync } from "react-async";
import { VictoryTheme } from 'victory';
import { BarGraph, LineGraph, CandlestickGraph } from './tables';
import { or, not } from 'ramda';

const getData = async ({ csv }) => {
  try {
    const res = await fetch(`http://localhost:3001/csv?csv=${csv}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
    return await res.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

// source
// https://covid-19.ontario.ca/data
const covidDeaths = [
  { x: '< 20', y: 4/100 },
  { x: '20-29', y: 26/100 },
  { x: '30-39', y: 60/100 },
  { x: '40-49', y: 144/100 },
  { x: '50-59', y: 462/100 },
  { x: '60-69', y: 1084/100 },
  { x: '70-79', y: 1916/100 },
  { x: '80-89', y: 3177/100 },
  { x: '90+', y: 2473/100 }
];

const covidDeaths80VNot80 = [
  { x: '< 80', y: 4+26+60+144+462+1084+1916 },
  { x: '>= 80', y: 3177+2473 }
];

export const App = () => {
  const { data: deaths } = useAsync({ promiseFn: getData, csv: 'deaths' });
  const { data: population } = useAsync({ promiseFn: getData, csv: 'population' });

  const renderRelative = or(not(deaths), not(population));

  return (
    <div className="app">
      <header className="header">
        Ontario COVID Deaths Jan 2020 - Aug 2021
      </header>
      <BarGraph
        data={covidDeaths}
        xAxisLabel="Ages"
        xAxisLabelDy={-8}
        domainPadding={{ x: 20 }}
        yAxisLabel="Deaths (in Hundreds)"
        yAxisValues={[0, 7, 14, 21, 28, 34]}
      />

      <header className="header">
        Ontario COVID Deaths Jan 2020 - Aug 2021 80 vs Not 80
      </header>
      <BarGraph
        data={covidDeaths80VNot80}
        xAxisLabel="Ages"
        yAxisLabel="Deaths"
        xAxisLabelDy={-35}
        domainPadding={{ x: 100 }}
        theme={VictoryTheme.material}
        yAxisValues={[0, 1500, 3000, 4500, 6000]}
      />

      <header className="header">
        Canadian Deaths 1971 - 2020
      </header>
      <CandlestickGraph
        type="deaths"
        data={deaths}
        render={!deaths}
        xAxisValues={[150, 200, 250, 300, 325]}
        xAxisLabel="Total Deaths (in Thousands)"
      />

      <header className="header">
        Canadian Deaths Change Per Year 1971 - 2020
      </header>
      <LineGraph data={deaths} />

      <header className="header">
        Canadian Population 1971 - 2020
      </header>
      <CandlestickGraph
        type="population"
        data={population}
        render={!population}
        xAxisValues={[20, 25, 30, 35, 40]}
        xAxisLabel="Total Population (in Millions)"
      />

      <header className="header">
        Canadian Deaths Relative to Population 1971 - 2020
      </header>
      {!renderRelative && (
        <CandlestickGraph
          type="relative"
          data={{ deaths, population }}
          xAxisValues={[.6, .7, .8]}
          xAxisLabel="Realtive Deaths to Population (%)"
        />
      )}
    </div>
  );
};

export default App;
