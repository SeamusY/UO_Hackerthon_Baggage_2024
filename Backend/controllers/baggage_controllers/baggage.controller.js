const getBaggages = async (ctx) => {
  try{let baggagedb = await db.collection('/baggage').get()
  let list = ctx.body = baggagedb.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
  }))
  ctx.body = list;
  ctx.status = 200;
  }catch(err){
    console.log(err)
    ctx.body = "Error: {" + err + "}";
    ctx.status = 500
  }
};

const updateBaggages = (ctx) => {
  ctx.body = []; // Send to backend for edit.
  ctx.status = 204;
};

module.exports = {
  getBaggages,
  updateBaggages
};