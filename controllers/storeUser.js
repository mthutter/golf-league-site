const User = require('../models/database')
const path = require('path')

//add PG user add function

User.insertUserTableData('username', 'first', 'last', 'email', 'phone', 'password');

   