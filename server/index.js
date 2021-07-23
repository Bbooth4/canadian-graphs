const csv = require('csvtojson');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3001;

// Deaths source https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000801
// Population source https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000901

app.get('/deaths', async (req, res) => {
  let data;
  try {
    await csv().fromFile(__dirname + '/canadian_deaths.csv').then(res => {
      data = res;
    });
  } catch (err) {
    console.log(err);
  };
  res.send(data);
});

app.get('/population', async (req, res) => {
  let data;
  try {
    await csv().fromFile(__dirname + '/canadian_population.csv').then(res => {
      data = res;
    });
  } catch (err) {
    console.log(err);
  };
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 'https://www150.statcan.gc.ca/t1/tbl1/en/dtl!downloadDbLoadingData.action?pid=1710000801&latestN=0&startDate=19710101&endDate=20190101&csvLocale=en&selectedMembers=%5B%5B%5D%2C%5B2%5D%5D&checkedLevels=0D1',

// {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' }
// }
