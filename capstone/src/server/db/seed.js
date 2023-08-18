const db = require('./client');
const { createUser } = require('./users');
const { createItem } = require('./items')

const users = [
  {
    username: 'EmilyJohnson',
    email: 'emily@example.com',
    password: 'securepass',
    isAdmin: true,
  },
  {
    username: 'LiuWei',
    email: 'liu@example.com',
    password: 'strongpass',
    isAdmin: false,
  },
  {
    username: 'IsabellaGarcía',
    email: 'bella@example.com',
    password: 'pass1234',
    isAdmin: false,
  },
  {
    username: 'MohammedAhmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
    isAdmin: false,
  },
  {
    username: 'JohnSmith',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
  },
  // Add more user objects as needed
];  

const items = [
  {
    itemName: 'Handup Gloves',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0146/4421/5856/files/IScreamPalm.png?v=1691424148&width=830&height=830&crop=center',
    description: 'Handup Gloves have been the best mountain bike gloves for grabbin bars and beers since 2014. What began as bold, minimalist cycling gloves for mtb riders, cyclocross racers, and downhill riders has become much more. We have expanded into four separate glove weights to get you through the seasons, introduced a line of golf gloves in our other favorite pastime, and made apparel affordable for casual wearing, cycling, golfing, or just being active outside.',
    isHighlighted: true,
  },
]

const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS items;
        DROP TABLE IF EXISTS users;
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) DEFAULT 'username',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            isAdmin BOOLEAN DEFAULT false
        );

        CREATE TABLE items(
          id SERIAL PRIMARY KEY,
          "authorId" INTEGER REFERENCES users(id),
          itemName VARCHAR(255) NOT NULL,
          imageUrl TEXT NOT NULL,
          description TEXT NOT NULL,
          isHighlighted BOOLEAN DEFAULT false
        );
        `)
    }
    catch(err) {
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({username: user.username, email: user.email, password: user.password, isAdmin: user.isAdmin || false});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertItems = async () => {
  try {
    for (const item of items) {
      await createItem({itemName: item.itemName, imageUrl: item.imageUrl, description: item.description, isHighlighted: item.isHighlighted || false});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
        await insertItems();
      
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()
