import { createClient, fetchExchange, cacheExchange } from 'urql';
import qql from 'graphql-tag';
import express from 'express';
import cors from 'cors';


const app = express();
const port = process.env.VEHICLE_PORT || 3002;


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
        media {
          image {
            thumbnail_url
            }
            }
            }
            }
`;

const VehicleDetailsQuery = qql`
query vehicle($vehicleId: ID!) {
  vehicle(id: $vehicleId) {
    naming {
      make
      model
      chargetrip_version
      }
      media {
        image {
          url
          }
          brand {
            thumbnail_url
            }
            }
            battery {
              usable_kwh
              }
              range {
                best {
                  highway
                  city
                  combined
                  }
      worst {
        highway
        city
        combined
        }
        chargetrip_range {
          best
          worst
          }
    }
    routing {
      fast_charging_support
      }
      connectors {
        standard
        }
        performance {
          acceleration
          top_speed
          }
          }
          }
          `;
          
async function getVehicleList(page, size = 10, search = ''){
  return await client
	.query(vehicleListQuery, { page, size, search })
	.toPromise()
	.then(response => {
    console.log("resp liste", response);
		return response.data.vehicleList;
	})
	.catch(error => console.log(error));
};

async function getVehicleDetails(vehicleId){
  return await client
  .query(VehicleDetailsQuery, { vehicleId })
  .toPromise()
  .then(response => {
    console.log("resp detail", response);
    return response.data;
  })
  .catch(error => console.log(error));
}

app.use(cors());

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

app.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID: ", id);
    res.setHeader('Content-Type', 'application/json');
    getVehicleDetails(id)
      .then(vehicle => {
        console.log("Vehicle: ", vehicle);
        res.end(JSON.stringify(vehicle));
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