import './App.css';
import { useAsync } from "react-async";
import { LineGraph, CandlestickGraph } from './tables';

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

export const App = () => {
  const { data: deaths } = useAsync({ promiseFn: getData, csv: 'deaths' });
  const { data: population } = useAsync({ promiseFn: getData, csv: 'population' });

  return (
    <div className="App">
      <header className="header">
        Canadian Deaths 1971 - 2020
      </header>
      <CandlestickGraph
        data={deaths}
        xAxis={[150, 200, 250, 300, 325]}
      />

      <header className="header">
        Canadian Deaths Change Per Year 1971 - 2020
      </header>
      <LineGraph data={deaths} />

      <header className="header">
        Canadian Population 1971 - 2020
      </header>
      <CandlestickGraph
        data={population}
        xAxis={[150, 200, 250, 300, 325]}
      />
    </div>
  );
};

export default App;
