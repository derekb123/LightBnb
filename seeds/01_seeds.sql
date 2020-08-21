INSERT INTO users (name, email, password) 
VALUES ('Al Ant', 'a@a.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Bil Boy', 'b@b.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Cal Cop', 'c@c.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url,cost_per_night,parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, province, post_code, active) 
VALUES (1, 'House A', 'description', https://www.pexels.com/photo/house-2581922, www.pexels.com/photo/house-2581922, 500, 2, 2, 3, Canada, 'A Street', 'Ontario', 'A1A 1A1', active),
(2, 'House B', 'description', https://www.pexels.com/photo/beige-and-green-house-2439595, https://www.pexels.com/photo/beige-and-green-house-2439595, 400, 2, 1, 2, Canada, 'B Street', 'Quebec', 'B1B 1B1', active),
(3, 'House C', 'description', https://www.pexels.com/photo/white-blue-and-yellow-house-2625766, https://www.pexels.com/photo/white-blue-and-yellow-house-2625766, 600, 2, 2, 4, Canada, 'C Street', 'British Columbia', 'C1C 1C1', active)

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating) 
VALUES (1, 1, 1, 3, 4),
(2, 2, 2, 4, 5),
(3, 3, 3, 5, 4);

