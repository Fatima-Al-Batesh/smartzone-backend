const Router = require("express").Router;
const router = Router();
let db = null;
// get all 

/**
 * return a list of models. after pagination. 
 * this function will filter the data accovrding to the filtering query params
 */

 //pricemin=x&pricemax&brand=x
router.get("/",(req,res)=>{

    const details= {
        price : {$lte:9999,$gte:0}
    };

    if(req.query.brand) details.brand =  req.query.brand;
     if(req.query.pricemax || req.query.pricemin ) details.price = {$lte:9999,$gte:0};
     if(req.query.pricemax) details.price.$lte = parseInt(req.query.pricemax);
     if(req.query.pricemin ) details.price.$gte= parseInt(req.query.pricemin);

    console.log(details);
    db.collection("models").find(details,(err,result)=>{
        if(err) {
            res.status(500).json({
            status:500,
            error : true,
            message:"Internal error"
        });
        console.log("Showroom > get all");
    }

    //pagination
        result.limit(10);
        let offset = parseInt(req.query.offset)||0;
        result.skip(offset);
        result.toArray().then(arrayOfData=>{
            res.status(200).json(
                {
                    status:200,
                    error:false,
                    message:"data retrieved successfully",
                    data:arrayOfData
                }
            );
        })
    });
})

module.exports =  (_db)=>{
    db = _db;
    return router
};