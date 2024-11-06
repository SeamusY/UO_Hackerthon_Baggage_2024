const Router = require("koa-router");
const router = new Router();
const { getBaggages } = require("./controllers/baggage_controllers/baggage.controller");
router.get("/baggages", getBaggages);
router.post("/add_event", (ctx) => (ctx.body = "Event Posted!"));

module.exports = router;