DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS property_reviews CASCADE;


CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  alias VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id),
  title VARCHAR(255),
  description VARCHAR(255),
  thumbnail_photo_url VARCHAR(255),
  cover_photo_url VARCHAR(255),
  parking_spaces VARCHAR(2),
  number_of_bathrooms VARCHAR(255),
  number_of_bedrooms VARCHAR(255),
  country VARCHAR(255),
  street VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  post_code VARCHAR(255),
  active BOOLEAN
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  start_date date,
  end_date date,
  property_id INTEGER REFERENCES properties(id),
  guest_id INTEGER REFERENCES users(id)
);

CREATE TABLE property_reviews(
  id SERIAL PRIMARY KEY,
  resevation_Id INTEGER REFERENCES reservations(id),
  property_id INTEGER REFERENCES properties(id),
  guest_id INTEGER REFERENCES users(id),
  rating VARCHAR(255),
  message VARCHAR(255)
);