const http = require('http');

const options = {
  port: 3000,
  hostname: 'localhost',
  path: '/test?lat=45&lon=6',
  headers: {},
  method: 'GET',
};

function dataTesting(data) {
    console.log("Data: ", data);
    console.log(data.id_station);
    console.log("lat : ", data.xlongitude);
    console.log("lon : ", data.ylatitude);
    console.log("puissance : ", data.puiss_max);
    console.log("type : ", data.type_prise);
    console.log("accès : ", data.acces_recharge);
    console.log("adresse : ", data.ad_station);
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
