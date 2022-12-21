const sequelize = require('../config/connection');
const { User, Books } = require('../models');

const seedUsers = require('./user-seeds.json');
const seedBooks = require('./books-seeds.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // todo: finish for books
  for (const book of bookData) {
    await Books.create({
      ...book,
      user_id: users
    });
  }

  console.log('\n----- DATABASE SYNCED -----\n');
  console.log('\n----- USERS SEEDED -----\n');
  console.log('\n----- BOOKS SEEDED -----\n');

  process.exit(0);
};

seedAll();