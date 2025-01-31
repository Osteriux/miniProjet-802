function makeUrlListe(page, size, search = "") {
    return `http://localhost:3002/list?page=${page}&size=${size}&search=${search}`;
}

function makeUrlDetails(id) {
    return `http://localhost:3002/detail/${id}`;
}

async function fetchVehicleListe(page, size, search = "") {
    return await fetch(makeUrlListe(page, size, search))
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            console.log(err);
        });
}

async function fetchVehicleDetails(id) {
    return await fetch(makeUrlDetails(id))
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            console.log(err);
        });
}

export { fetchVehicleListe, fetchVehicleDetails };