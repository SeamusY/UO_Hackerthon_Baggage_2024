const getBaggages = (ctx) => {
  ctx.body = [];
  ctx.status = 200;
};

const updateBaggages = (ctx) => {
  ctx.body = []; // Send to backend for edit.
  ctx.status = 200;
};

module.exports = {
  getBaggages,
  updateBaggages
};