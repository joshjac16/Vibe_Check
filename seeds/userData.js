const { User } = require('../models');

const userData = [
  {
    username: 'Broomhilde',
    email: 'user@user.com',
    password: '$2b$10$b5ua4tgv9dup688nfk4Dzuo5Tb7zqsDcZmEIcYaxoJRMvvRAjEDTm',
  },
  {
    username: 'Baxter',
    email: 'tester@test.com',
    password: '$2b$10$b5ua4tgv9dup688nfk4Dzuo5Tb7zqsDcZmEIcYaxoJRMvvRAjEDTm',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
