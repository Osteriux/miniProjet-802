const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PRISE_PORT || 3001;

app.use(cors());

function makeApiUrl(lat, lon, distance = 100) {
    // console.log("fetching with : ", lat, lon, distance);
    let point = `POINT(${lon} ${lat})`;
    // return `https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/bornes-irve/records?where=within_distance(geo_point_borne%2C%20GEOM%27POINT(45%206)%27%2C%201000km)&order_by=distance(geo_point_borne%2C%20GEOM%27POINT(45%206)%27)&limit=20`;
    return `https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/bornes-irve/records?where=within_distance(geo_point_borne%2C%20GEOM%27${point}%27%2C%20${distance}km)&order_by=distance(geo_point_borne%2C%20GEOM%27${point}%27)`;
}

async function fetchData(lat, lon) {
    let dist = 1;
    let finished = false;
    let data = [];

    while (!finished) {
        await fetch(makeApiUrl(lat, lon, dist))
            .then(response => response.json())
            .then(json => {
                if (json.total_count == 0) {
                    dist *= 10;
                } else {
                    data = json.results;
                    finished = true;
                }
            })
            .catch(err => {
                console.log(err);
                finished = true;
            });
    }

    // console.log("Data: ", data[0]);
    return data[0];
}

app.get("/nearest", async (req, res) => {
    console.log(req.query);

    res.setHeader('Content-Type', 'application/json');
    const data = await fetchData(req.query.lat, req.query.lon);
    res.end(JSON.stringify(data));
});

app.listen(port, () => console.log(`Prise Fetcher listening on port ${port}!`));