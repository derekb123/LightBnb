const { Pool } = require('pg');

const properties = require('./json/properties.json');
const users = require('./json/users.json');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return pool.query(
    `SELECT * FROM users
      WHERE email = $1;
    `
  , [email])
  .then (res => res.rows[0]);


  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  return pool.query(
    `SELECT * FROM users
      WHERE id = $1;
    `
  , [id])
  .then (res => res.rows[0]);
  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;



/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(
    `INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `
  , [user.name,user.email,user.password])
  .then (res => res.rows[0]);

  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(
    `SELECT *, avg(property_reviews.rating) as average_rating 
    FROM reservations 
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id, property_reviews.id
    LIMIT $2;
    `
  , [guest_id, limit])
  .then (res => res.rows);
  // return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    let word = ' AND ';
    if (queryParams.length === 0) {
      word = ' WHERE ';
    }
    queryParams.push(`%${options.city}%`);
    queryString += `${word} city LIKE $${queryParams.length} `;
  }
  
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    let word = ' AND ';
    if (queryParams.length === 0) {
      word = ' WHERE ';
    }
    queryParams.push(options.minimum_price_per_night);
    queryParams.push(options.maximum_price_per_night);
    queryString += `${word} cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length} `;
  } 
  // else if (options.minimum_price_per_night && !options.maximum_price_per_night) {
  //   queryParams.push(`%${options.minimum_price_per_night}%`);
  //   queryString += `WHERE cost_per_night >= $${queryParams.length - 1} AND $${queryParams.length}`;
  // }

  if (options.minimum_rating) {
    let word = ' AND ';
    if (queryParams.length === 0) {
      word = ' WHERE ';
    }
    queryParams.push(options.minimum_rating);
    queryString += `${word} rating >= $${queryParams.length} `;
  } 

  if (options.owner_id) {
    let word = ' AND ';
    if (queryParams.length === 0) {
      word = ' WHERE ';
    }
    queryParams.push(options.owner_id);
    queryString += `${word} owner_id = $${queryParams.length} `;
  } 

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;


  console.log(queryString);


  return pool.query(queryString, queryParams)
  .then(res => res.rows);
};


//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
