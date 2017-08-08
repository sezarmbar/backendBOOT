INSERT INTO USER (ID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, EMAIL, ENABLED, LASTPASSWORDRESETDATE) VALUES (1, 'admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin', 'admin', 'admin@admin.com', 1, '2003-12-31');
-- INSERT INTO USER (ID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, EMAIL, ENABLED, LASTPASSWORDRESETDATE) VALUES (2, 'user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user', 'user', 'enabled@user.com', 1, '2003-12-31');
-- INSERT INTO USER (ID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, EMAIL, ENABLED, LASTPASSWORDRESETDATE) VALUES (3, 'disabled', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user', 'user', 'disabled@user.com', 0, '2003-12-31');

INSERT INTO AUTHORITY (ID, NAME) VALUES (1, 'ROLE_USER');
INSERT INTO AUTHORITY (ID, NAME) VALUES (2, 'ROLE_ADMIN');

INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES (1, 1);
INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES (1, 2);
-- INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES (2, 1);
-- INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES (3, 1);

INSERT INTO rating (rating_id, bad, god, name_of_rat, normal, very_bad, very_god,active,waiting_time) VALUES (1, '5', '4', 'first', '5', '6', '7',TRUE ,44);
INSERT INTO rating (rating_id, bad, god, name_of_rat, normal, very_bad, very_god,active,waiting_time) VALUES (2, '5', '2', 'second', '2', '4', '4',TRUE,44 );


INSERT INTO review (review_text, rating_id) VALUES ('aaaaaaaaaaaaaaaaaaaaa', '1');

INSERT INTO review (review_text, rating_id) VALUES ('ccccccccccccccccccccccccc', '2');

INSERT INTO review (review_text, rating_id) VALUES ('dddddddddddddddddd', '1');

INSERT INTO review (review_text, rating_id) VALUES ('tttttttttttttttttt', '2');

INSERT INTO review (review_text, rating_id) VALUES ('yyyyyyyyyyyyyyyyyyyyyyyyyyyy', '1');



-- {"username":"mbar","firstname":"sezar","lastname":"sezar","email":"sezar@sezar.com",
-- "password":"sezar","authorities":[{"name":"ROLE_USER"},{"name":"ROLE_ADMIN"}],"enabled":true
-- }
