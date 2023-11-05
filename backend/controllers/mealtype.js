const mealtypes=require('../models/mealtype')

exports.getAllMealtype=(req,res)=>{
    mealtypes.find()
    .then(
        result=>{
             res.status(200).json({
               message:"Mealtype fetched Succesfully",
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