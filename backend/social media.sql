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
  bio VARCHAR(255),
  country VARCHAR(255)
);

EXEC sp_rename 'Users.name', 'fullname', 'COLUMN';
SELECT * FROM Users;

-- Posts Table

CREATE TABLE Posts (
  id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
  userId INT NOT NULL,
  description VARCHAR(255),
  image VARCHAR(255),
  createdAt DATETIME,
  FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Comments Table
CREATE TABLE Comments (
    id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    description VARCHAR(255),
    createdAt DATETIME,
    userId INT NOT NULL,
    postId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE NO ACTION
);


SELECT * FROM Comments;

CREATE TABLE Stories (
    id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    image VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users (id),
)


CREATE TABLE Relationships(
    id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    followerUserId INT NOT NULL,
    followedUserId INT NOT NULL,
    FOREIGN KEY (followerUserId) REFERENCES Users(id),
    FOREIGN KEY (followerUserId) REFERENCES Users(id)
);
SELECT * FROM Relationships;

CREATE TABLE Likes (
    id INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    userId INT NOT NULL,
    postId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE NO ACTION
);


SELECT * FROM Likes;
CREATE TABLE Rooms(
    id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    FOREIGN KEY (senderId) REFERENCES Users(id),
    FOREIGN KEY (receiverId) REFERENCES Users(id)
)

SELECT * FROM Rooms;
        SELECT * FROM Rooms WHERE (senderId = 1022 AND receiverId = 32) OR (senderId = 32 AND receiverId = 1022)


CREATE TABLE Messages(
    id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    roomId UNIQUEIDENTIFIER NOT NULL,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    message NVARCHAR(1000) COLLATE Latin1_General_100_CI_AI_SC_UTF8 NOT NULL,
    createdAt DATETIME,
    FOREIGN KEY (senderId) REFERENCES Users(id),
    FOREIGN KEY (receiverId) REFERENCES Users(id),
    FOREIGN KEY (roomId) REFERENCES Rooms(id)
)

SELECT * FROM Messages;