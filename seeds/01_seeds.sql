INSERT INTO users (alias,email,password)
VALUES
('myName','myName@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'), 
('yourName','yourName@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'), 
('hisName','hisName@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES
(1,'doesNotMatter','YESandNO','whatThumb','yourCover',3,2,2,'Canada','123_Street','Van','BC','123-312',TRUE),
(2,'doesNotMatter','YESandNO','whatThumb','yourCover',3,2,2,'Canada','123_Street','Van','BC','123-312',TRUE),
(3,'doesNotMatter','YESandNO','whatThumb','yourCover',3,2,2,'Canada','123_Street','Van','BC','123-312',TRUE);


INSERT INTO reservations (start_date, end_date, guest_id, property_id) 
VALUES 
('2018-09-11', '2018-09-26',1, 1 ),
('2019-01-04', '2019-02-01',2, 2 ),
('2021-10-01', '2021-10-14',3, 3 );

INSERT INTO property_reviews (reservation_id,property_id,guest_id,rating,message)
VALUES
(1,1,1,5,'message'),
(2,2,2,5,'message'),
(3,3,3,5,'message');
