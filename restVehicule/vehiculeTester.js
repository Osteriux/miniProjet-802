import http from 'http';

const optionsListe = {
  port: process.env.VEHICLE_PORT || 3002,
  hostname: process.env.HOST || 'localhost',
  path: '/list?page=0&size=100&search=',
  headers: {},
  method: 'GET',
};

const optionsDetails = {
  port: process.env.VEHICLE_PORT || 3002,
  hostname: process.env.HOST || 'localhost',
  path: '/detail/5f043d88bc262f1627fc032b',
  headers: {},
  method: 'GET',
};

function dataTestingListe(data) {
    console.log("Data Liste: ", data);
    console.log("nb Vehicules : ", data.length);
    if(data.length > 0) {
      const vehicule = data[0];
      console.log("Vehicule: ", vehicule);
      console.log("Vehicule ID: ", vehicule.id);
      console.log("Vehicule Make: ", vehicule.naming.make);
      console.log("Vehicule Model: ", vehicule.naming.model);
    }
}

function dataTestingDetails(data) {
	console.log("Data Detail: ", data);
	console.log("Vehicule Make: ", data.naming.make);
	console.log("Vehicule Model: ", data.naming.model);
	console.log("Vehicule ChargeTrip Version: ", data.naming.chargetrip_version);
	console.log("Vehicule Image URL: ", data.media.image.url);
	console.log("Vehicule Brand Thumbnail URL: ", data.media.brand.thumbnail_url);
	console.log("Vehicule Usable kWh: ", data.battery.usable_kwh);
	console.log("fast_charge: ", data.routing.fast_charging_support);
	console.log("connector: ", data.connectors.map(connector => connector.standard));
	console.log("accélération: ", data.performance.acceleration);
	console.log("top_speed: ", data.performance.top_speed);
	console.log("range (best highway): ", data.range.best.highway);
	console.log("range (best city): ", data.range.best.city);
	console.log("range (best combined): ", data.range.best.combined);
	console.log("range (worst highway): ", data.range.worst.highway);
	console.log("range (worst city): ", data.range.worst.city);
	console.log("range (worst combined): ", data.range.worst.combined);
}


const req1 = http.get(optionsListe, (res) => {
  console.log(`Connected - Status Code ${res.statusCode}`);

  let data = '';

  res.on('data', (chunk) => {
    console.log("Chunk data: ", chunk.toString());
    data += chunk;
  });

  res.on('end', () => {
    console.log('No more data');
    console.log("data: ", data);
    const parsedData = JSON.parse(data);
    dataTestingListe(parsedData);
  });

  res.on('close', () => {
    console.log('Connection closed');
  });
});

req1.on('error', (error) => {
  console.error('An error occurred: ', error);
});

req1.end();

const req2 = http.get(optionsDetails, (res) => {
	console.log(`Connected - Status Code ${res.statusCode}`);

	let data = '';

	res.on('data', (chunk) => {
		console.log("Chunk data: ", chunk.toString());
		data += chunk;
	});

	res.on('end', () => {
		console.log('No more data');
		console.log("data: ", data);
		const parsedData = JSON.parse(data);
		dataTestingDetails(parsedData.vehicle);
	});

	res.on('close', () => {
		console.log('Connection closed');
	});
});

req2.on('error', (error) => {
	console.error('An error occurred: ', error);
});

req2.end();
