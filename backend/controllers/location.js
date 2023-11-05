const location=require('../models/location')

exports.getAllLocations=(req,res)=>{
    location.find()
    .then(
        result=>{
             res.status(200).json({
               message:"Location fetched Succesfully",
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