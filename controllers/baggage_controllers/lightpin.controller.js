const getPinColor = async (pin) => {

    // A: if passenger offboard or confidenceStatus == 'NO LOAD' (EOBT in less than 5 min AND confidenceStatus = 'WAIT TO LOAD'), 
    // color = 'red'
    // B: else if passenger is on board or confidenceStatus == 'OK TO LOAD'
    // color = 'green'
    // C: else if passenger confidenceStatus == 'WAIT TO LOAD'
    // color = 'yellow'

    // uuid -> luggage RFID -> pax -> pax_distance -> pax_confidence -> confidenceStatus
    let color = null;
    if (A) {
        color = 'red';
    }
    else if (B) {
        color = 'green';
    }
    else if (C){
        color = 'yellow';
    }
    // log this ping for health check
    return { color: color || 'error' }; // Return unknown if pin isn't defined
};
const getPinHealth = async (pin) => {
    // did this `pin` ping getPinColor in the last <threshold> minutes
    return true
}

module.exports = {
    getPinColor,
    getPinHealth,
};