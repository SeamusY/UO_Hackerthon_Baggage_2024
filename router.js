const Router = require("koa-router");
const router = new Router();
const { getBaggages } = require("./controllers/baggage_controllers/baggage.controller");
const { getPinColor } = require("./controllers/baggage_controllers/lightpin.controller");
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