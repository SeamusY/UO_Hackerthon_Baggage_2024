const Router = require("koa-router");
const router = new Router();
const googleConfig = require("../secret.json");
const { getBaggages } = require("./controllers/baggage_controllers/baggage.controller");
const { getPinColor } = require("./controllers/baggage_controllers/lightpin.controller");
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(googleConfig),
  databaseURL: "https://testing_db.firebaseio.com"
});

require('dotenv').config()

// const app = initializeApp({
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// });

// const db = getFirestore(app);
const db = admin.firestore();


router.get("/testing_db", async (ctx) => {
  // const q = query(collection(db, "testing_db"), where("id", "==", "H3LL0"));
  try {
    const q = db.collection("/users").doc("cDU392ANN7OVdBYAnN9l");
    const user = await q.get();
    const userData = user.data();
    ctx.body = JSON.stringify(userData);
    ctx.status = 200;
  } catch(err) {
    console.log("ERROR ", err);
    ctx.body = "Error";
    ctx.status = 500;
  }
});

router.get("/baggages", getBaggages);
router.post("/add_event", (ctx) => (ctx.body = "Event Posted!"));

router.get('/pincolor', async (ctx) => {
    const pinId = ctx.query.pinid; // Get the pin id from the query parameters
    if (!pinId) {
        ctx.status = 400; // Set the response status to 400
        ctx.body = { color: 'error', error: 'pinid parameter is required' }; // Return the error message
    }
    try {
        const result = await getPinColor(pinId); // Correct function name
        ctx.body = result; // Set the result as the response body
    } catch (error) {
        ctx.status = 500; // Set the response status to 500
        ctx.body = { color: 'error', error: 'An error occurred while processing your request.' }; // Return an error message
    }
});

module.exports = router;