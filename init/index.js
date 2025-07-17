const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" }); // ✅ path points to root

const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js"); // ✅ Import the User model

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

  // ✅ Create a demo user
  const user = new User({
    email: "shantanu@gmail.com",
    username: "ShantanuPatne",
  });
  await user.save();

  // ✅ Assign this user as owner to all listings
  const listingsWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: user._id,
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("DB initialized with listings + demo user");
};

initDB();
