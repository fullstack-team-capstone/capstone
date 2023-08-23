-- users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) DEFAULT 'username',
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN DEFAULT false
);

-- items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    "authorId" INTEGER REFERENCES users(id),
    itemName VARCHAR(255) NOT NULL,
    imageUrl TEXT NOT NULL,
    description TEXT NOT NULL,
    isHighlighted BOOLEAN DEFAULT false
);

-- reviews table
CREATE TABLE reviews (
    reviewid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reviewableid INTEGER REFERENCES items(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    stars INTEGER NOT NULL,
    reviewbody TEXT NOT NULL,
    bottomline BOOLEAN DEFAULT false



