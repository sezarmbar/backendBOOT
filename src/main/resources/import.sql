INSERT INTO USER (ID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, EMAIL, ENABLED, LASTPASSWORDRESETDATE) VALUES (1, 'admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin', 'admin', 'admin@admin.com', 1, '2003-12-31');
INSERT INTO USER (ID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, EMAIL, ENABLED, LASTPASSWORDRESETDATE) VALUES (2, 'sezar', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin', 'admin', 'admin@admin.com', 1, '2003-12-31');

INSERT INTO AUTHORITY (ID, NAME) VALUES (1, 'ROLE_USER');
INSERT INTO AUTHORITY (ID, NAME) VALUES (2, 'ROLE_ADMIN');

INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES (1, 1);
INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES (1, 2);

INSERT INTO rating (rating_id, bad, god, name_of_rat, normal, very_bad, very_god,active,waiting_time) VALUES (1, '5', '4', 'first', '5', '6', '7',TRUE ,0);
INSERT INTO rating (rating_id, bad, god, name_of_rat, normal, very_bad, very_god,active,waiting_time) VALUES (2, '1', '1', 'second', '1', '1', '1',TRUE,0 );

INSERT INTO user_rating(user_name,rating_name) VALUES('sezar','first');
INSERT INTO review (review_text, rating_id) VALUES ('aaaaaaaaaaaaaaaaaaaaa', '1');

INSERT INTO review (review_text, rating_id) VALUES ('ccccccccccccccccccccccccc', '2');

INSERT INTO review (review_text, rating_id) VALUES ('dddddddddddddddddd', '1');

INSERT INTO review (review_text, rating_id) VALUES ('tttttttttttttttttt', '2');

INSERT INTO review (review_text, rating_id) VALUES ('yyyyyyyyyyyyyyyyyyyyyyyyyyyy', '1');

