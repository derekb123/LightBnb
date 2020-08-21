const database = require('./database');

// let query = {owner_id : 578, city : 'Botwood'};
// database.getAllProperties(query, 1)
// .then(properties => console.log({properties}))
// .catch(e => {
//   console.error(e);
// });



database.getAllReservations(743, 1)
.then(reservations => console.log({reservations}))
.catch(e => {
  console.error(e);
});

