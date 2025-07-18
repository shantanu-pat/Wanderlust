const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
  title: { type: String, required: false },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      set: (v) =>
        v === "" ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" : v
    }
  },
  price: Number,
  location: String,
  country: String,

  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      default: [77.216721, 28.6448] // You can change this default
    }
  },

  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing){
  await Review.deleteMany({_id:{$in:listing.reviews}});
}
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
