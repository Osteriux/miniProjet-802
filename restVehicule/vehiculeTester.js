import http from 'http';

const options = {
  port: process.env.VEHICLE_PORT || 3000,
  hostname: process.env.HOST || 'localhost',
  path: '/list?page=0&size=100&search=',
  headers: {},
  method: 'GET',
};

function dataTesting(data) {
    console.log("Data: ", data);
    console.log("nb Vehicules : ", data.length);
    if(data.length > 0) {
      const vehicule = data[0];
      console.log("Vehicule: ", vehicule);
      console.log("Vehicule ID: ", vehicule.id);
      console.log("Vehicule Make: ", vehicule.naming.make);
      console.log("Vehicule Model: ", vehicule.naming.model);
    }
}


const req = http.get(options, (res) => {
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
    dataTesting(parsedData);
  });

  res.on('close', () => {
    console.log('Connection closed');
  });
});

req.on('error', (error) => {
  console.error('An error occurred: ', error);
});

req.end();
