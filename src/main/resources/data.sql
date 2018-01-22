INSERT INTO POST (ID, OWNER, TOPIC, LAST_MODIFIED)
VALUES (1, 'mcampanha', 'Is JEE dead?', {ts '2018-01-10 18:47:52.69'});

INSERT INTO POST (ID, OWNER, TOPIC, LAST_MODIFIED)
VALUES (2, 'mcampanha', 'What is OAS?', {ts '2018-01-15 19:13:16.00'});

INSERT INTO POST (ID, OWNER, TOPIC, LAST_MODIFIED)
VALUES (3, 'asuzuki', 'Spring Data Rest Projections?', {ts '2018-01-20 13:44:18.00'});

INSERT INTO COMMENT (ID, OWNER, TEXT, LAST_MODIFIED)
VALUES (1, 'mcampanha', 'I would like to hear from you all, what do you think about the current state of JEE.', {ts '2018-01-10 18:47:52.69'});

INSERT INTO COMMENT (ID, OWNER, TEXT, LAST_MODIFIED)
VALUES (2, 'mcampanha', 'Someone could explain to me what is OAS?', {ts '2018-01-15 19:13:16.00'});

INSERT INTO COMMENT (ID, OWNER, TEXT, LAST_MODIFIED)
VALUES (3, 'asuzuki', 'I would not recommend it for cloud native application development simply because there are easier ways to do that nowadays', {ts '2018-01-11 10:22:12.00'});

INSERT INTO COMMENT (ID, OWNER, TEXT, LAST_MODIFIED)
VALUES (4, 'asuzuki', 'OAS stands for Open API Specification', {ts '2018-01-16 11:15:35.00'});

INSERT INTO COMMENT (ID, OWNER, TEXT, LAST_MODIFIED)
VALUES (5, 'jdoe', 'Could you elaborate a little better?', {ts '2018-01-16 11:37:48.00'});

INSERT INTO COMMENT (ID, OWNER, TEXT, LAST_MODIFIED)
VALUES (6, 'asuzuki', 'Anyone has a good material to share on Spring Data Rest projections?', {ts '2018-01-20 13:44:18.00'});


INSERT INTO POST_COMMENTS (POST_ID, COMMENTS_ID)
VALUES (1, 1);

INSERT INTO POST_COMMENTS (POST_ID, COMMENTS_ID)
VALUES (1, 3);

INSERT INTO POST_COMMENTS (POST_ID, COMMENTS_ID)
VALUES (2, 2);

INSERT INTO POST_COMMENTS (POST_ID, COMMENTS_ID)
VALUES (2, 4);

INSERT INTO POST_COMMENTS (POST_ID, COMMENTS_ID)
VALUES (2, 5);

INSERT INTO POST_COMMENTS (POST_ID, COMMENTS_ID)
VALUES (3, 6);


