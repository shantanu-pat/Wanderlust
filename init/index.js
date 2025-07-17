const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await User.deleteMany({});

  // ✅ Register user with hashed password
  const user = new User({ email: "shantanu@gmail.com", username: "ShantanuPatne" });
  const registeredUser = await User.register(user, "shantanu123"); // ✅ 'shantanu123' is the password

  // ✅ Use registered user's ID
  const listingsWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: registeredUser._id,
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("DB initialized with listings + demo user");
};

initDB();
