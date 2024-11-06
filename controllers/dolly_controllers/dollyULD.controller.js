const sensorResponses = async (dollyQr = 0) => {
    // in actual situations this implementation will actually call sensors in Dolly to get the proximity RFID tags
    const simulatedResponses = [
        [
            { id: 'tag1', },
            { id: 'tag2', },
            { id: 'tag3', }
        ],
        [
            { id: 'tag4', },
            { id: 'tag5', }
        ],
    ][dollyQr];
    return simulatedResponses; // Return the list of RFID tags
};

const getRfidDevicesList = async (dollyQr) => {
    // Ask sensors to retrieve RFID tags in the proximity
    let list = await sensorResponses(dollyQr)
    return { count: list.length, data: list }
}

module.exports = {
    getRfidDevicesList,
};