// db/seed.js

const db = require('./client');
const { createUser } = require('./users');
const { createItem } = require('./items')
const {createReview} = require('./reviews')
const {createComment} = require('./comments')

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
    isAdmin: true,
  },
  {
    username: 'JohnSmith',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: true,
  },
  // Add more user objects as needed
];  

const items = [
  {
    authorId: 4,
    itemName: 'Handup Gloves',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0146/4421/5856/files/IScreamPalm.png?v=1691424148&width=830&height=830&crop=center',
    description: 'Handup Gloves have been the best mountain bike gloves for grabbin bars and beers since 2014. What began as bold, minimalist cycling gloves for mtb riders, cyclocross racers, and downhill riders has become much more. We have expanded into four separate glove weights to get you through the seasons, introduced a line of golf gloves in our other favorite pastime, and made apparel affordable for casual wearing, cycling, golfing, or just being active outside.',
    isHighlighted: true,
  },

  {
    authorId: 5,
    itemName: 'Panaracer GravelKing SK Tire',
    imageUrl: 'https://www.rei.com/media/f97e050d-5834-46d1-9660-44dfd054abbc.jpg?size=784x588',
    description: 'More aggressive than the original GravelKing, the GravelKing SKs aggressive knobs, ZSG Natural rubber compound, puncture protection breaker and AX-alpha special low rolling resistance casing make the Gravelking a go-anywhere tire.',
    isHighlighted: false,
  },

  {
    authorId: 5,
    itemName: 'Allex Spring LTD - SRAM Force eTap AXS 1x',
    imageUrl: 'https://assets.specialized.com/i/specialized/90021-76_ALLEZ-SPRINT-LTD-PRPTNTALU-CMLN_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
    description:"The Allez Sprint is the fastest alloy road bike in history, thanks to the time its sibling, the Tarmac SL7, spent in the wind. It's details like the most complex alloy head tube we've ever made and integrated cables that make it 41 seconds faster over 40km than the previous Allez Sprint. That's a hell of a facelift. With 41 seconds, you'd have a podium picture in your Insta feed, just saying.",
    isHighlighted: false,
  },

  {
    authorId: 4,
    itemName: 'Diverge STR Pro',
    imageUrl: 'https://assets.specialized.com/i/specialized/96223-10_DIVERGE-STR-PRO-BLZ-VLTGSTPRL_RDSQ?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto',
    description: "By suspending the rider with damped, tunable travel—20mm front/30mm rear—Future Shock Technology absorbs bump forces to boost your control and capability while retaining the efficiency and responsiveness of a rigid frame. Because as far as power transfer goes, it is a rigid frame. Power to the pedals makes the bike jump like a scared cat. You're efficient, you're comfortable, you're in control. Your bike is light, nimble, and responsive.",
    isHighlighted: false,
  },

  {
    authorId: 5,
    itemName: 'Quadlock',
    imageUrl: 'https://cdn.sanity.io/images/3azemr64/production/91c32ec7d8bd0de7a631c90453d571260059642a-1024x768.jpg?auto=format&w=860&h=645&crop=center&fit=crop',
    description: 'The Quad Lock® Universal Adaptor is designed using a strong 3M™ VHB adhesive that can be adhered directly to the rear of most smartphones or cases, which then allows your smartphone to be securely attached to the Quad Lock® Bike Mounts',
    isHighlighted: false,
  },

  {
    authorId: 4,
    itemName: 'Fliiight Smart Trainer',
    imageUrl: 'https://www2023-assets.s3.us-west-2.amazonaws.com/products/fliiiight.jpg',
    description: "Fliiiight's magnetic eddy-current resistance unit doesn't touch your wheel, which means it doesn't make any noise. No noise means that the loudest noise you hear is your bike's drivetrain, letting you train when and where you want.  Fliiiight's resistance unit doesn't touch your wheel or tire, which means you don't have to replace your tire like a wheel-on trainer, and you don't have to remove your entire wheel like a direct-drive trainer. You get to use the exact same tire, tube, and cassette you use outdoors.  Fliiiight's resistance unit learns your pedal stroke and modulates instantaneous resistance continuously so that it feels like you're riding with a flywheel even though there is no mechanical connection to your wheel.",
    isHighlighted: false,
  },

  {
    authorId: 4,
    itemName: 'Medium 3 Can Modular Insulated Bag',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0146/4421/5856/files/RealTreeBag.png?v=1685041271&width=700&height=700&crop=center',
    description: 'The new STASHERS v3.0 modular, insulated bags features a food-grade removable liner to safely carry fruit, snacks, ice, etc. Use the liner with the cans or remove the liner to carry cans with coozies on them.',
    isHighlighted: false,
  }

]
const reviews = [
  {
    userid: 1,
    reviewableid: 1,
    title: 'Loved this product!',
    stars: 5,
    reviewbody:'The product arrived on time! Loved the speedy service!',
    bottomline: true,
  },

  {
    userid: 2,
    reviewableid: 1,
    title: 'Fantastic thing',
    stars: 5,
    reviewbody: 'Great customer service and product.',
    bottomline: true,
  },

  {
    userid: 3,
    reviewableid: 1,
    title: "Didn't work for me.",
    stars: 3,
    reviewbody: 'They tore immediately.',
    bottomline: false,
  },

  {
    userid: 1,
    reviewableid: 2,
    title: 'Perfect for my needs.',
    stars: 5,
    reviewbody: 'Fits perfectly on my handlebars.',
    bottomline: true,
  },

  {
    userid: 2,
    reviewableid: 2,
    title: 'Too small.',
    stars: 2,
    reviewbody: "I could see how this might work for others but it's too small for my phone.",
    bottomline: false,
  },

  {
    userid: 3,
    reviewableid: 2,
    title: 'Very stable.',
    stars: 4,
    reviewbody: 'Fits very well but would prefer higher-end materials.',
    bottomline: true,
  },

]

const comments = [
  {
    userid: 4, 
    reviewid: 1, 
    thumbsUpOrDown: true,
    title: 'Great Review',
    commentBody: 'I got the same product and it performed just as you mentioned!'
  },

  {
    userid: 5,
    reviewid: 1,
    thumbsUpOrDown: false,
    title: 'Inaccurate',
    commentBody: 'Not my experience at all.',
  },

  {
    userid: 4,
    reviewid: 2,
    thumbsUpOrDown: true,
    title: 'Well said!',
    commentBody: 'Great product, would buy again.',
  },

];

const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS reviews;
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
            "isAdmin" BOOLEAN DEFAULT false
        );

        CREATE TABLE items(
          id SERIAL PRIMARY KEY,
          "authorId" INTEGER REFERENCES users(id),
          itemName VARCHAR(255) NOT NULL,
          imageUrl TEXT NOT NULL,
          description TEXT NOT NULL,
          isHighlighted BOOLEAN DEFAULT false
        );

        CREATE TABLE reviews(
          reviewid SERIAL PRIMARY KEY,
          userid INTEGER REFERENCES users(id) ON DELETE CASCADE,
          reviewableid INTEGER REFERENCES items(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          stars INTEGER NOT NULL,
          reviewbody TEXT NOT NULL,
          bottomline BOOLEAN DEFAULT false
        );
        

        CREATE TABLE comments(
          commentid SERIAL PRIMARY KEY,
          userid INTEGER REFERENCES users(id),
          reviewid INTEGER REFERENCES reviews(reviewid),
          "thumbsUpOrDown" BOOLEAN DEFAULT true, 
          title VARCHAR(255) NOT NULL,
          "commentBody" TEXT NOT NULL
          


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
      await createItem({authorId: item.authorId, itemName: item.itemName, imageUrl: item.imageUrl, description: item.description, isHighlighted: item.isHighlighted || false});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertReviews = async () => {
  try {
    for (const review of reviews) {
      await createReview({userid: review.userid, reviewableid: review.reviewableid, title: review.title, stars: review.stars, reviewbody: review.reviewbody, bottomline: review.bottomline || false});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertComments = async () => {
  try {
    for (const comment of comments) {
      await createComment({
        userid: comment.userid,
        reviewid: comment.reviewid,
        thumbsUpOrDown: comment.thumbsUpOrDown || false,
        title: comment.title,
        commentBody: comment.commentBody
      });
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
        await insertReviews();
        await insertComments();

    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()
