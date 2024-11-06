const getPinColor = async (db, pin) => {
    let uId = null
    let color = null
    let user = null
    try {
        const tag = await db.collection("/light_tag_baggage").get()
        const tagList = tag.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })); // Get all data from Users.
        uId = tagList.find((doc) => doc.id == pin).user_id
        console.log('pin is ', pin, '-> uId is ', uId)
    } catch (error) {
        console.log(error)
        return
    }

    try {
        console.log(18)
        let usersdb = await db.collection("/users").get()
        const usersList = usersdb.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })); // Get all data from Users.

        user = usersList.find((doc) => doc.id == uId)

        // A: if passenger offboard or confidenceStatus == 'NO LOAD' (EOBT in less than 5 min AND confidenceStatus = 'WAIT TO LOAD'), 
        // color = 'red'
        // B: else if passenger is on board or confidenceStatus == 'OK TO LOAD'
        // color = 'green'
        // C: else if passenger confidenceStatus == 'WAIT TO LOAD'
        // color = 'yellow'

        if (user.board_status == 'OFF_LOAD' || user.passenger_confidence < 50) {
            color = 'red';
        }
        else if (user.board_status == 'BOARDED' || user.passenger_confidence >= 90) {
            color = 'green';
        }
        else if (user.passenger_confidence >= 50) {
            color = 'yellow';
        }
        else {
            color = undefined;
        }
    } catch (error) {
        console.log(error)
    }
    // add a record to light_tag_pings
    try {
        db.collection("/light_tag_pings").add({
            tagId: pin,
            ts: new Date(),
            color: color,
        });
        console.log('added ping to pings log')
    } catch (err) {
        console.log(err);
    }
    return { color: color || 'error' }; // Return unknown if pin isn't defined
};
const getPinHealth = async (db, pin) => {
    let pinLog = await db.collection('light_tag_pings').get()
    let list = ctx.body = pinLog.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    let flist = list.filter(doc => doc.tagId == pin && (new Date().getTime() - doc.ts._seconds * 1000 < 5 * 60 * 1000))
    // console.log(flist)
    return flist.length > 0
}

module.exports = {
    getPinColor,
    getPinHealth,
};