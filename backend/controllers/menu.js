const menu=require('../models/menu')

exports.getMenuByRestaurant=(req,res)=>{
    let filter={
        restaurantName:req.params.rName
    }
    menu.find(filter)
    .then(
        result=>{
             res.status(200).json({
               message:"Menu fetched Succesfully",
               data:result
            })
        }
    )
    .catch(
        error=>{
            res.status(500).json({
               message:"DB error occured !!",
               error:error
            })
        }
    ) 



}