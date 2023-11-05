
const express=require('express')
const locationController=require('../controllers/location')

const router=express.Router();

router.get('',locationController.getAllLocations)
// router.get('/:cName',restaurantController.getRestaurantsByCity)


// router.post('',restaurantController.addRestaurant)

// router.put('',(req,res)=>{
//     res.send('you called put restaurant method')
// })

// router.delete('',(req,res)=>{
//     res.send('you called delete restaurant method')
// })

module.exports=router;