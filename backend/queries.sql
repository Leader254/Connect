use socialMedia;

-- Users Table

CREATE TABLE Users (
  id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  fullname VARCHAR(255) NOT NULL,
  coverPic VARCHAR(255),
  profilePic VARCHAR(255),
  country VARCHAR(255)
);

EXEC sp_rename 'Users.name', 'fullname', 'COLUMN';
SELECT * FROM Users;
UPDATE Users
SET profilePic = 'https://avatars.githubusercontent.com/u/105350534?s=400&u=c7ff6e1bce4f9113d125619eb28fa7520a8022e4&v=4',
    coverPic = 'https://images.pexels.com/photos/10634924/pexels-photo-10634924.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    country = 'kenya'
    WHERE id = 26;

UPDATE Users
SET coverPic = 'https://images.pexels.com/photos/3429058/pexels-photo-3429058.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    country = 'Kenya'
    WHERE id = 33;
  
UPDATE Users
SET fullname = 'Mwai Ngatia'
    WHERE id = 26;


DELETE FROM Users;

-- Posts Table

CREATE TABLE Posts (
  id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
  userId INT NOT NULL,
  description VARCHAR(255),
  image VARCHAR(255),
  createdAt DATETIME,
  FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Dummy test data
INSERT INTO Posts (userId, description, image, createdAt) VALUES
(26, 'This is a dummy post to test the relationship between friends.', 'https://images.pexels.com/photos/14958090/pexels-photo-14958090/free-photo-of-aerial-view-of-hills-in-the-death-valley.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '2023-07-14 21:34:40')

SELECT * FROM Posts;

DELETE FROM Posts WHERE id = 2;

-- Comments Table
CREATE TABLE Comments (
  id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
  description VARCHAR(255),
  createdAt DATETIME,
  userId INT NOT NULL,
  postId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (postId) REFERENCES Posts(id)
);

SELECT * FROM Comments;

DELETE FROM Comments WHERE id = 5;

-- DELETE FROM Comments WHERE id = 1,2,3,4,5,7;

CREATE TABLE Stories (
    id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    image VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users (id),
)

-- CREATE TABLE Relationships(
--     id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
--     followerUserId INT NOT NULL,
--     followedUserId INT NOT NULL,
--     FOREIGN KEY (followerUserId) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE,
--     FOREIGN KEY (followerUserId) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE,
-- )

CREATE TABLE Relationships(
    id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    followerUserId INT NOT NULL,
    followedUserId INT NOT NULL,
    FOREIGN KEY (followerUserId) REFERENCES Users(id),
    FOREIGN KEY (followerUserId) REFERENCES Users(id)
);
SELECT * FROM Relationships;

INSERT INTO Relationships (followerUserId, followedUserId)
VALUES (33, 32);


INSERT INTO Relationships (followedUserId, followerUserId)
VALUES (33, 32);

CREATE TABLE Likes(
    id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    userId INT NOT NULL,
    postId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (postId) REFERENCES Posts(id)
);

SELECT * FROM Likes;

INSERT INTO Likes (userId, postId)
VALUES (33, 1011);

CREATE TABLE Messages(
    id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    roomId UNIQUEIDENTIFIER NOT NULL,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    message NVARCHAR(1000) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NOT NULL,
    createdAt DATETIME,
    FOREIGN KEY (senderId) REFERENCES Users(id),
    FOREIGN KEY (receiverId) REFERENCES Users(id)
)

SELECT * FROM Messages;