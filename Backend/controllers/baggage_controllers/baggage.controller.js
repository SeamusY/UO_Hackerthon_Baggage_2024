const getBaggages = async (db,ctx) => {
  const baggagedb = await db.collection('/baggage').get()
  const list = baggagedb.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
  }))
  
  return list
};

// const updateBaggages = (ctx) => {
//   ctx.body = []; // Send to backend for edit.
//   ctx.status = 204;
// };

module.exports = {
  getBaggages,
  updateBaggages
};