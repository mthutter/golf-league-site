const bcrypt = require("bcrypt");
const saltRounds = 10;
const password = "Admin@123";

//bcrypt encryption async
async function encryptPass(plainPassword) {
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      console.log("Salt: ", salt);
      return bcrypt.hash(plainPassword, salt);
    })
    .then((hash) => {
      console.log("Hash: ", hash);
    })
    .catch((err) => console.error(err.message));
}

//autogen salt and hash
bcrypt
  .hash(password, saltRounds)
  .then((hash) => {
    console.log("Hash ", hash);
  })
  .catch((err) => console.error(err.message));

//bcrypt compare - user login validation
bcrypt
  .hash(password, saltRounds)
  .then((hash) => {
    userHash = hash;
    console.log("Hash ", hash);
    validateUser(hash);
  })
  .catch((err) => console.error(err.message));

function validateUser(hash) {
  bcrypt
    .compare(password, hash)
    .then((res) => {
      console.log(res); // return true
    })
    .catch((err) => console.error(err.message));
}
