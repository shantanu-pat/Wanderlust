const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    id = id.trim();
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    
    if (!listing) {
        req.flash("error", "Listing your requested for does not exist!");
        return res.redirect("/listings");
    }

    // Ensure listing has geometry data or set default (Delhi, India)
    if (!listing.geometry) {
        listing.geometry = {
            type: "Point",
            coordinates: [77.2090, 28.6139] // Delhi coordinates
        };
    }

    res.render("listings/show.ejs", { 
        listing,
        CurrUser: req.user,
        MAPTILER_TOKEN: process.env.MAPTILER_TOKEN,
        process: { env: { MAPTILER_KEY: process.env.MAPTILER_TOKEN } }
    });
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    
    // Create geometry data from location
    const geometry = {
        type: "Point",
        coordinates: [req.body.listing.longitude || 77.2090, req.body.listing.latitude || 28.6139]
    };

    const newListing = new Listing({
        ...req.body.listing,
        geometry,
        owner: req.user._id,
        image: { url, filename }
    });

    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

// ... rest of your controller methods remain the same ...

    module.exports.renderEditForm = async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
          req.flash("error", "Listing your requested for does not exist!");
          res.redirect("/listings");
        }
      let originalImageUrl =  listing.image.url;
originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250")
        res.render("listings/edit.ejs", { listing , originalImageUrl});
      };

      module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
     
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
     let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
  };

  module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", " Listing Deleted!!");
    res.redirect("/listings");
  };