
const express=require('express')
const mealtypesController=require('../controllers/mealtype')

const router=express.Router();

router.get('',mealtypesController.getAllMealtype)
// router.get('/:cName',restaurantController.getRestaurantsByCity)


// router.post('',restaurantController.addRestaurant)

// router.put('',(req,res)=>{
//     res.send('you called put restaurant method')
// })

// router.delete('',(req,res)=>{
//     res.send('you called delete restaurant method')
// })

module.exports=router;