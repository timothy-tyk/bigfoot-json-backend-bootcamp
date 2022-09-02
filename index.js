const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();

  // console.log(req.params);
  if (Object.keys(req.query).length > 0) {
    // console.log(req.query);
    const key = Object.keys(req.query)[0];
    const value = req.query[key];
    // console.log(key, value);
    const filteredSearch = sightings.filter((sighting, index) => {
      return sighting.YEAR == value && index;
    });
    console.log(filteredSearch.length);
    return res.json(filteredSearch);
  } else {
    res.json(sightings);
  }
});
app.get("/sightings/:reportNumber", async (req, res) => {
  const reportNumber = req.params.reportNumber;
  console.log(reportNumber);
  const sightings = await getSightings();
  const filteredSearch = sightings.filter((sighting) => {
    return sighting.REPORT_NUMBER == reportNumber;
  });
  console.log(filteredSearch);
  res.send(filteredSearch);
});

app.get("/sightings?YEAR=:year", async (req, res) => {
  console.log(req.params);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
