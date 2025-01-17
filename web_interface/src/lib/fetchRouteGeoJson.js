function makeUrl(slat, slon, elat, elon) {
    return `http://localhost:3004/route?slat=${slat}&slon=${slon}&elat=${elat}&elon=${elon}`;
}

async function test(){
    console.log('test');
    const response = await fetch('test.json');
    const geoJson = await response.json();
    return geoJson;
}

export { test };