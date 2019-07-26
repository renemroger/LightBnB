const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
/// Users

let client;
const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: 'lightbnb',
  password: '123',
});

pool.connect((err, poolClient, release) => {
  client = poolClient;
  console.log('connected to the db')
});
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then((res) => {
        resolve(res.rows[0]);
      }).catch(function(error) {
        reject(null);
      })
  });

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT * FROM users WHERE id = $1`, [id])
      .then((res) => {
        resolve(res.rows[0]);
      }).catch(function(error) {
        reject(null);
      })
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return new Promise(function(resolve, reject) {
    pool.query(`INSERT INTO users (name,email,password) VALUES(
    $1,
    $2,
    $3)
    RETURNING *;
    `, [user.name, user.email, user.password]
    ).then((res) => {
      resolve(res);
    }).catch(function(error) {
      reject(null);
    })
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return new Promise(function(resolve, reject) {
    pool.query(`
      SELECT * FROM reservations
      WHERE guest_id = $1
      LIMIT $2;
  `, [guest_id, limit])
      .then((res) => {
        resolve(res.rows);
      }).catch(function(error) {
        reject(null);
      })
  });

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
  return new Promise(function(resolve, reject) {
    const queryParams = [];
    // 2
    let queryArray = [];
    let queryString = ''

    queryString += `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

    if (options.city || options.minimum_price_per_night || options.maximum_price_per_night || options.minimum_rating) {
      queryString += ' WHERE '
    }

    if (options.owner_id) {
      queryParams.push(options.id);
      queryArray.push(`owner_id LIKE $${queryParams[queryParams.length]}`);
    }

    // 3
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryArray.push(`city LIKE '${queryParams[queryParams.length - 1]}'`);
    }
    if (options.minimum_price_per_night && options.maximum_price_per_night) {
      queryParams.push(options.minimum_price_per_night);
      queryParams.push(options.maximum_price_per_night);
      queryArray.push(` cost_per_night < ${queryParams[queryParams.length - 1]} AND cost_per_night > ${queryParams[queryParams.length - 2]}`)

    } else {
      if (options.minimum_price_per_night) {
        queryParams.push(options.minimum_price_per_night);
        queryArray.push(` cost_per_night > ${queryParams[queryParams.length - 1]}`)
      }

      if (options.maximum_price_per_night) {
        queryParams.push(options.minimum_price_per_night);
        queryArray.push(` cost_per_night < ${queryParams[queryParams.length - 1]}`)
      }
    }

    queryString += queryArray.join(' AND ');

    if (options.minimum_rating) {
      queryParams.push(options.minimum_rating);
      queryArray.push(` property_reviews.rating > ${queryParams[queryParams.length - 1]}`)
    }

    // 4
    queryParams.push(limit);
    queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT ${queryParams.length};
  `;
    console.log(queryString);
    client.query(queryString)
      .then(res => {
        console.log(res.rows);
        resolve(res.rows);
      }).catch(function(error) {
        reject(null);
      })
  });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return new Promise(function(resolve, reject) {

  })
    .then(res => {
      resolve(null);
    })

  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
}
exports.addProperty = addProperty;
