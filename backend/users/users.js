import bcrypt from 'bcryptjs'


const users = [
  {
    name: "admin user",
    email: "admin@eg.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: "FE user",
    email: "user1@eg.com",
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: "BE  user",
    email: "user2@eg.com",
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users