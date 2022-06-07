const router=require("express").Router();
const Movie=require("../models/Movie");

const verify=require("../VerifyToken");



//Create
router.post("/",verify,async(req,res)=>{
if( req.user.isAdmin)
{
  const newMovie=new Movie(req.body)
  try {
    const saveMovie =await newMovie.save();
    res.status(201).json(saveMovie)
      
  } catch (error) {
      res.status(500).json(error)
      
  }
   
}else{
    res.status(403).json("You  are Not allowed");
}
});


//update
router.put("/:id",verify,async(req,res)=>{
    if( req.user.isAdmin)
    {
     
      try {
        const updateMovie =await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateMovie)
          
      } catch (error) {
          res.status(500).json(error)
          
      }
       
    }else{
        res.status(403).json("You  are Not allowed");
    }
    });

    //delete
router.delete("/:id",verify,async(req,res)=>{
    if( req.user.isAdmin)
    {
     
      try {
  await Movie.findByIdAndDelete(req.params.id)
        res.status(200).json("the movie has been deleted")
          
      } catch (error) {
          res.status(500).json(error)
          
      }
       
    }else{
        res.status(403).json("You  are Not allowed");
    }
    });

    //Get
    router.get("/find/:id",async(req,res)=>{
         
          try {
    const movie=  await Movie.findById(req.params.id)
            res.status(200).json(movie)
              
          } catch (error) {
              res.status(500).json(error)
              
          }
           
        
        });
    
            //Get random
 
router.get("/random", verify, async (req, res) => {
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
  router.get("/search", verify, async (req, res) => {
    const search = req.query.search;
    let movie;
    try {
     
const userRegex = new RegExp(search, 'i')
        movie = await Movie.find(
          { title:userRegex}
          
        );
     
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get("/category", verify, async (req, res) => {
    const category = req.query.category;
    let movie;
    try {
     
const userRegex = new RegExp(category, 'i')
        movie = await Movie.find(
          { genre:userRegex}
          
        );
     
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });
      //get all
      router.get("/",async(req,res)=>{
         
        try {
  const Movies=  await Movie.find()
          res.status(200).json(Movies)
            
        } catch (error) {
            res.status(500).json(error)
            
        }
         
      
      });
module.exports=router;