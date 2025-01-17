const http = require('http');

const options = {
  port: process.env.ROUTE_PORT || 3004  ,
  hostname: process.env.HOST || 'localhost',
  path: '/route?slat=48.8566&slon=2.3522&elat=48.8566&elon=2.3522',
  headers: {},
  method: 'GET',
};

function dataTesting(data) {
    console.log("Data: ", data);
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
