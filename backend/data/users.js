import bcrypt from 'bcryptjs'


const users = [
  {
    fullName: "admin user",
    email: "admin@eg.com",
    phoneNumber: 123334,
    gender: "female",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    fullName: "FE user",
    email: "user1@eg.com",
    phoneNumber: 123344,
    gender: "female",
    password: bcrypt.hashSync('123456', 10),
  },
  {
    fullName: "BE  user",
    email: "user2@eg.com",
    phoneNumber: 125534,
    gender: "male",
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users