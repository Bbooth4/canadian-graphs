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
// Aug 17, 2021
const covidDeaths = [
  { x: '< 20', y: 5/100 },
  { x: '20-29', y: 28/100 },
  { x: '30-39', y: 62/100 },
  { x: '40-49', y: 149/100 },
  { x: '50-59', y: 468/100 },
  { x: '60-69', y: 1105/100 },
  { x: '70-79', y: 1941/100 },
  { x: '80-89', y: 3191/100 },
  { x: '90+', y: 2478/100 }
];

const covidDeaths80VNot80 = [
  { x: '< 80', y: 4+28+62+149+468+1105+1941 },
  { x: '>= 80', y: 3191+2478 }
];

const ontarioCovidData = [
  { x: '< 20', cases: 90493, deaths: 5 },
  { x: '20-29', cases: 118215, deaths: 28 },
  { x: '30-39', cases: 90904, deaths: 62 },
  { x: '40-49', cases: 79635, deaths: 149 },
  { x: '50-59', cases: 78389, deaths: 468 },
  { x: '60-69', cases: 49020, deaths: 1105 },
  { x: '70-79', cases: 24392, deaths: 1941 },
  { x: '80-89', cases: 16628, deaths: 3191 },
  { x: '90+', cases: 8660, deaths: 2478 }
];

const ontarioCovidData80VNot80 = [
  {
    x: '< 80',
    deaths: 4+28+62+149+468+1105+1941,
    cases: 90493+118215+90904+79635+78389+49020+24392
  },
  {
    x: '>= 80',
    deaths: 3177+2473,
    cases: 16628+8660
  }
];

export const App = () => {
  const { data: deaths } = useAsync({ promiseFn: getData, csv: 'deaths' });
  const { data: population } = useAsync({ promiseFn: getData, csv: 'population' });

  const renderRelative = or(not(deaths), not(population));

  return (
    <div className="app">
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

      <header className="header">
        Ontario COVID Deaths Percents Jan 2020 - Aug 2021
      </header>
      <BarGraph
        type="percent"
        data={ontarioCovidData}
        xAxisLabel="Ages"
        xAxisLabelDy={-8}
        domainPadding={{ x: 20 }}
        yAxisLabel="Death Rate Realtive to Cases (%)"
        yAxisValues={[0, 10, 20, 30]}
      />

      <header className="header">
        Ontario COVID Deaths Percents Jan 2020 - Aug 2021 80 vs Not 80
      </header>
      <BarGraph
        type="percent"
        data={ontarioCovidData80VNot80}
        xAxisLabel="Ages"
        xAxisLabelDy={-20}
        domainPadding={{ x: 80 }}
        theme={VictoryTheme.material}
        yAxisLabel="Death Rate Realtive to Cases (%)"
        yAxisValues={[0, 10, 20, 30]}
      />

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
    </div>
  );
};

export default App;
