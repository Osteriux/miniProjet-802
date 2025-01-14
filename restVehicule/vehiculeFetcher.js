import { createClient, fetchExchange, cacheExchange } from 'urql';
import qql from 'graphql-tag';
import express from 'express';

const app = express();
const port = process.env.VEHICLE_PORT || 3000;

const headers = {
    'x-client-id': '678529ba4dd456c02066b772',
    'x-app-id': '678529bb4dd456c02066b774',
};

const client = createClient({
    url: 'https://api.chargetrip.io/graphql',
    fetchOptions: {
      method: 'POST',
      headers,
    },
    exchanges: [cacheExchange, fetchExchange],
});

const vehicleListQuery = qql`
query vehicleList($page: Int, $size: Int, $search: String) {
  vehicleList(
    page: $page, 
    size: $size, 
    search: $search, 
  ) {
    id
    naming {
      make
      model
    }
  }
}
`;

async function getVehicleList(page, size = 10, search = ''){
	return await client
	.query(vehicleListQuery, { page, size, search })
	.toPromise()
	.then(response => {
		console.log("resp", response);
		return response.data.vehicleList;
	})
	.catch(error => console.log(error));
};

app.get("/list", async (req, res) => {
    try {
        const { page, size, search } = req.query;
		console.log("Page: ", page, " Size: ", size, " Search: \"", search, "\"");
        res.setHeader('Content-Type', 'application/json');
        getVehicleList(parseInt(page), parseInt(size), search)
			.then(vehicles => {
				console.log("Vehicles: ", vehicles);
				res.end(JSON.stringify(vehicles));
			})
			.catch(error => {
				console.log(error);
				res.status(500).send(error.message);
			});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => console.log(`Vehicle Fetcher listening on port ${port}!`));