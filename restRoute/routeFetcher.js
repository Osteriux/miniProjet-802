const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.ROUTE_PORT || 3004;

app.use(cors());
app.use(express.json());

function makeGetApiUrl(slat, slon, elat, elon) {
    return `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPENROUTE_TOKEN}&start=${slat},${slon}&end=${elat},${elon}`;
}

const PostApiUrl = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

async function fetchGetData(slat, slon, elat, elon) {
    const url = makeGetApiUrl(slat, slon, elat, elon);
    console.log(url);
    const response = await fetch(url);
    return response.json();
}

async function fetchPostData(positions) {
    const response = await fetch(PostApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.OPENROUTE_TOKEN
        },
        body: JSON.stringify({
            coordinates: positions
        })
    });
    return response.json();
}

app.get("/route", async (req, res) => {
    console.log(req.query);

    const { slat, slon, elat, elon } = req.query;
    res.setHeader('Content-Type', 'application/json');
    const data = await fetchGetData(slat, slon, elat, elon);
    res.end(JSON.stringify(data));
});

app.post("/route", async (req, res) => {
    console.log("body", req.body);

    res.setHeader('Content-Type', 'application/json');
    const data = await fetchPostData(req.body.positions);
    res.end(JSON.stringify(data));
});

app.listen(port, () => console.log(`Route Fetcher listening on port ${port}!`));