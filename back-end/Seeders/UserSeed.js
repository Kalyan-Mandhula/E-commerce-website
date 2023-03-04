const bcrypt = require("bcryptjs")
const ObjectId = require("mongodb").ObjectId

const users = [
      {
    name: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com',
    password: "admin",
    isAdmin: true,
  },
  {
    name: 'admin2',
    lastName: 'admin2',
    email: '1admin@admin.com',
    password: "admin",
    isAdmin: false,
  },
  {
    _id : ObjectId("63f6114afe02d2ffacadac32"),
    name: 'Michael',
    lastName: 'Scofield',
    email: 'Maxi@gmail.com',
    password: bcrypt.hashSync("Maxi",10),
    isAdmin: true,
  }
]

module.exports = users
