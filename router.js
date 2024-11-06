const Router = require("koa-router");
const router = new Router();

router.get("/events_list", (ctx) => (ctx.body = "Events List!"));
router.post("/add_event", (ctx) => (ctx.body = "Event Posted!"));

module.exports = router;