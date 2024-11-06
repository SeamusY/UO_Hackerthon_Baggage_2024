const Router = require("koa-router");
const router = new Router();
const googleConfig = require("../secret.json");
const { getBaggages } = require("./controllers/baggage_controllers/baggage.controller");
const { getPinColor, getPinHealth } = require("./controllers/baggage_controllers/lightpin.controller");
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(googleConfig),
  databaseURL: "https://testing_db.firebaseio.com"
});

require('dotenv').config()

const db = admin.firestore();

// router.get("/addping", async (ctx) => {
//   try {
//     const q = db.collection("/light_tag_pings").add({
//       tagId: ctx.query.tagid,
//       ts: new Date(),
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });


router.get("/testing_db", async (ctx) => {
  // const q = query(collection(db, "testing_db"), where("id", "==", "H3LL0"));
  try {
    const q = db.collection("/users").doc("cDU392ANN7OVdBYAnN9l");
    const totalCollection = await db.collection("/users").get();
    // const indiviudalCollection = (totalCollection ?? []).map((doc) =>  doc.get().data());
    console.log("THE DATA BASE LOGIC IS ", totalCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))); // Get all data from Users.
    const user = await q.get();
    const userData = user.data();
    ctx.body = JSON.stringify(userData);
    ctx.status = 200;
  } catch (err) {
    ctx.body = "Error";
    ctx.status = 500;
  }
});

router.get("/baggages", async (ctx) => {
  try {
    ctx.body = await getBaggages(db, ctx);
    ctx.status = 200;
  }
  catch (err) {
    console.log(err)
    ctx.body = "Error: {" + err + "}";
    ctx.status = 500
  }
});

router.get('/pincolor', async (ctx) => {
  // console.log(ctx.query.pinid)
  const pinId = ctx.query.pinid; // Get the pin id from the query parameters
  if (!pinId) {
    // console.log("no pinId")
    ctx.status = 400; // Set the response status to 400
    ctx.body = { color: 'error', error: 'pinid parameter is required' }; // Return the error message
    return
  }
  try {
    const result = await getPinColor(db, pinId); // Correct function name
    ctx.body = result; // Set the result as the response body
  } catch (error) {
    ctx.status = 500; // Set the response status to 500
    ctx.body = { color: 'error', error: 'An error occurred while processing your request.' }; // Return an error message
  }
});

// router.get('/pinhealthList', async (ctx) => {
//   try{
//     console.log(new Date().getTime())
//     // get pings of last 5 minutes and count length
//     let pinLog = await db.collection('light_tag_pings').get()
//     // ctx.body = pinLog.docs.filter((doc) => {
//     //   doc.tagId == ctx.query.pinid && (new Date() - doc.ts < 300000)
//     // })
//     let list = ctx.body=pinLog.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data()
//   }))
//   let flist = list.filter(doc => doc.tagId == ctx.query.pinid && (new Date().getTime()- doc.ts._seconds*1000 < 5*60*1000))
//     console.log(flist)
//     ctx.body=flist 
//     ctx.status = 200
//     // console.log(doc.ts._seconds)
//     // console.log(new Date().getTime()-doc.ts._seconds)
//     // console.log(new Date().getTime()-doc.ts._nanoseconds)
//     }
//   catch(err){
//     console.log(err)
//   }

router.get('/pinhealth', async (ctx) => {
  const pinId = ctx.query.pinid; // Get the pin id from the query parameters
  if (!pinId) {
    ctx.status = 400; // Set the response status to 400
    ctx.body = { color: 'error', error: 'pinid parameter is required' }; // Return the error message
    return
  }
  try {
    const result = await getPinHealth(db, pinId); // Correct function name
    ctx.body = { isAlive: result }; // Set the result as the response body
    ctx.status = 200
  } catch (error) {
    ctx.status = 500; // Set the response status to 500
    ctx.body = { color: 'error', error: 'An error occurred while processing your request.' }; // Return an error message
  }
})

module.exports = router;