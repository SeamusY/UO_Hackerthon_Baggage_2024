const getPassenger = (ctx) => {
  //
  
  ctx.body = [];

  ctx.status = 200;
};

const updatePassenger = (ctx) => {
  ctx.body = []; // Send to backend for edit.
  ctx.status = 200;
};

module.exports = {
  getPassenger,
  updatePassenger
};