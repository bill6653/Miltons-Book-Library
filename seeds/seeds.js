const sequelize = require('../config/connection');
const { User, Books } = require('../models');

const userData = require('./user-seeds.json');
const bookData = require('./books-seeds.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const book of bookData) {
    await Books.create({
      ...book,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  console.log('\n----- DATABASE SYNCED -----\n');
  console.log('\n----- USERS SEEDED -----\n');
  console.log('\n----- BOOKS SEEDED -----\n');

  process.exit(0);
};

seedAll();