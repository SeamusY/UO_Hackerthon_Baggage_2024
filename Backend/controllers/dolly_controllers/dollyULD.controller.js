const sensorResponses = async (dollyQr = 0) => {
    // in actual situations this implementation will actually call sensors in Dolly to get the proximity RFID tags
    const simulatedResponses = [
        [
            { id: 'light_tag1', },
            { id: 'light_tag2', },
            { id: 'light_tag3', }
        ],
        [
            { id: 'light_tag4', },
            { id: 'light_tag5', }
        ],
    ][dollyQr];
    return simulatedResponses; // Return the list of RFID tags
};

const getRfidDevicesList = async (ctx) => {
    // Ask sensors to retrieve RFID tags in the proximity
    let list = await sensorResponses(ctx.query.dollyQr)
    ctx.status = 200;
    ctx.body =  { count: list.length, data: list }
}

module.exports = {
    getRfidDevicesList,
};