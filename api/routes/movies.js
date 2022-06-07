const router = require("express").Router();
const Movie = require("../models/Movie");

const verify = require("../VerifyToken");

//multer
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
//fileFilter
function fileFilter(req, file, cb) {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

var upload = multer({ dest: "uploads", storage, fileFilter });

//Create
router.post("/", [verify, upload.single("image")], async (req, res) => {
  if (req.user.isAdmin) {
    console.log(req.file);
    const newMovie = new Movie({ ...req.body, image: req.file.path });
    try {
      const saveMovie = await newMovie.save();
      console.log(saveMovie);

      res.status(201).json(saveMovie);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You  are Not allowed");
  }
});

// //update
// router.put("/:id", [verify, upload.single("image")], async (req, res) => {
//   if (req.user.isAdmin) {
//     // console.log()
//     try {
//       const updateMovie = await Movie.findByIdAndUpdate(
//         req.params.id,
//         { $set: { ...req.body, image: req.file.path } },
//         { new: true }
//       );
//       res.status(200).json(updateMovie);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   } else {
//     res.status(403).json("You  are Not allowed");
//   }
// });

router.put("/:id", [verify, upload.single("image")], async (req, res) => {
  if (req.user.isAdmin) {
    console.log("Update");
    console.log(req.body);
    Movie.findByIdAndUpdate(req.params.id, req.body, function (err, docs) {
      if (err) {
        console.log(err);
        res.status(500).json(error);
      } else {
        console.log("Updated Movie : ", docs);
        res.status(200).json(docs);
      }
    });
  }
});

//delete
router.delete("/:id", [verify, upload.single("image")], async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("the movie has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You  are Not allowed");
  }
});

//Get
router.get("/find/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get random

router.get("/random", [verify, upload.single("image")], async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all
router.get("/", async (req, res) => {
  try {
    const Movies = await Movie.find();
    res.status(200).json(Movies);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
