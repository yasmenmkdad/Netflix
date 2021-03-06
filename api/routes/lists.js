const router = require("express").Router();
const List = require("../models/List");

const verify = require("../VerifyToken");

//Create
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const saveList = await newList.save();
      res.status(201).json(saveList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You  are Not allowed");
  }
});

//Delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//update
router.put("/:id", async (req, res) => {
  console.log(req.body);

  List.findByIdAndUpdate(req.params.id, req.body, function (err, docs) {
    if (err) {
      console.log(err);
      res.status(500).json(error);
    } else {
      console.log("Updated User : ", docs);
      res.status(200).json(docs);
    }
  });
});

//GET
router.get("/", async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.set("Access-Control-Allow-Origin", "*");

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All
router.get("/All", async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

module.exports = router;
