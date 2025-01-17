const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.ROUTE_PORT || 3004;

app.use(cors());

function makeApiUrl(slat, slon, elat, elon) {
    return `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPENROUTE_TOKEN}&start=${slat},${slon}&end=${elat},${elon}`;
}

async function fetchData(slat, slon, elat, elon) {
    const url = makeApiUrl(slat, slon, elat, elon);
    console.log(url);
    const response = await fetch(url);
    return response.json();
}

app.get("/route", async (req, res) => {
    console.log(req.query);

    const { slat, slon, elat, elon } = req.query;
    res.setHeader('Content-Type', 'application/json');
    const data = await fetchData(slat, slon, elat, elon);
    res.end(JSON.stringify(data));
});

app.listen(port, () => console.log(`Prise Fetcher listening on port ${port}!`));