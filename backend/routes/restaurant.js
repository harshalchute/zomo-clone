const express=require('express')
const restaurantController=require('../controllers/restaurant')

const router=express.Router();

router.get('',restaurantController.getAllRestaurants)
router.get('/:cName',restaurantController.getRestaurantsByCity)
router.get('/details/:name',restaurantController.getRestaurantDetails)
router.post('/filter/:pageNo',restaurantController.getAllRestaurantsByFilter)
// router.post('',restaurantController.addRestaurant)
// router.put('',restaurantController.updateRestaurant)
//router.delete('',restaurantController.deleteRestaurant)

module.exports=router;