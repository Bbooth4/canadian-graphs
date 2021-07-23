import './App.css';
import { useAsync } from "react-async";
import { LineDeathsTable, CandlestickTableDeaths } from './tables';

const getDeaths = async () => {
  try {
    const res = await fetch('http://localhost:3001/deaths',
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

const getPop = async () => {
  try {
    const res = await fetch('http://localhost:3001/population',
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
  const { data: deaths } = useAsync({ promiseFn: getDeaths });
  const { data: population } = useAsync({ promiseFn: getPop });
  console.log({population});
  deaths && console.log(deaths[deaths.length - 1]);

  return (
    <div className="App">
      <header className="header">
        Canadian Deaths 1971 - 2020
      </header>
      <CandlestickTableDeaths deaths={deaths} />

      <header className="header">
        Canadian Deaths Change Per Year 1971 - 2020
      </header>
      <LineDeathsTable deaths={deaths} />
    </div>
  );
};

export default App;
