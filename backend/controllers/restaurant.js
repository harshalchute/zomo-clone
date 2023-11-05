//const restaurant=require('../models/restaurant.json')
const Restaurant=require('../models/restaurant')

exports.getAllRestaurants=(req,res)=>{
    Restaurant.find()
    .then(
        result=>{
             res.status(200).json({
               message:"Restaurant fetched Succesfully",
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


exports.getRestaurantsByCity=(req,res)=>{
    let criteria={city:req.params.cName}
    Restaurant.find(criteria)
        .then(
            result=>{
                res.status(200).json({
                    message:"Restaurant fetched Succesfully",
                    data:result
                })
            }
        )
        .catch(
            error=>{
                res.status(500).json({
                    message:"Error Occured",
                    error:error
                })

            }
        )

}

// exports.getAllRestaurantsByFilter=(req,res)=>{

//     let filter={}

//     if(req.body.city_id){
//         filter.city=req.body.city_id;
//     }
//    //console.log(req.body.cuisine.length>0)
//     if(req.body.cuisine && req.body.cuisine.length>0){
//         filter['Cuisine.name']={$in: req.body.cuisine}
        
//     }

//     let sort=1;
//     if(req.body.sort){
//         sort=req.body.sort
//     }
//     //console.log(filter)
//     Restaurants.find(filter).limit(2).skip(2*(req.params.pageNo-1)).sort({cost:sort})
//     .then(
//         result=>{
//              res.status(200).json({
//                message:"Restaurant fetched Succesfully",
//                data:result
//             })
//         }
//     )
//     .catch(
//         error=>{
//             res.status(500).json({
//                message:"DB error occured !!",
//                error:error
//             })
//         }
//     ) 
// }
exports.getAllRestaurantsByFilter=(req,res)=>{
    const filter={}

     if(req.body.city_id){
         filter.city= req.body.city_id
     }

     if(req.body.cuisine && req.body.cuisine.length >0 ){
        filter['Cuisine.name']={ $in : req.body.cuisine }
     }
     
     if(req.body.lcost !==''&& req.body.lcost==0){
         
             filter.cost ={
                 $lte :req.body.hcost
             }
         }
         else{
            if(req.body.lcost && req.body.hcost)
            filter.cost= {
                $lt: req.body.hcost,
                $gt: req.body.lcost
            } 
         }
     

     
         filter.sort=req.body.sort
     
    //logic of pagination achieved through limit and skip 
    Restaurant.find(filter).limit(2).skip(2*(req.params.pageNo-1)).sort({"cost":filter.sort})
    .then(
        result=>{
            Restaurant.find(filter).count((err,count)=>{
                if(err)
                console.log(err)
                else
                res.status(200).json({ message:"data fetched successfully" , data:result ,totalRecords:count})
      
            })
             }
    ).catch(error=>{
            res.status(500).json({ message:"Error in database" , error:error })
    })
 
 }


exports.getRestaurantDetails=(req,res)=>{
    const filter={name:req.params.name}


    Restaurant.findOne(filter).then(
        result=>{
            res.status(200).json({ message:"data fetched successfully" , data:result })
        }
    ).catch(error=>{
            res.status(500).json({ message:"Error in database" , error:error })
    })
 
 }

// exports.addRestaurant=(req,res)=>{
//     console.log(req)
//     console.log("req.body",req.body)

// }