const express=require('express')
const bodyParser=require('body-parser')
const restaurantRoutes=require('./routes/restaurant')
const locationRoutes=require('./routes/location')
const mealtypeRoutes=require('./routes/mealtype')
const menuRoutes=require('./routes/menu')
const paymentRoutes=require('./routes/payment')
const mongoose=require('mongoose')
const cors=require('cors')


// const DBCONNECTIONSTRING="mongodb+srv://root:root@zomato-clone.xwuyg.mongodb.net/zomato";

const DBCONNECTIONSTRING="mongodb://localhost:27017/zomato";




mongoose.connect(
    DBCONNECTIONSTRING,
    ()=>{
        console.log("mongodb connected")
    },
    e=>console.log(e)
)


const PORT=process.env.PORT || 6767;

var app=express()

app.use(bodyParser.json())
app.use(cors())
app.use('/restaurant',restaurantRoutes)
app.use('/location',locationRoutes)
app.use('/mealtype',mealtypeRoutes)
app.use('/menu',menuRoutes)
app.use('/pay',paymentRoutes)


//deploy configuration
if(process.env.NODE_ENV="production"){
    app.use(express.static("frontend/build"))
}


app.listen(PORT,()=>{
    console.log(`app is running on port:${PORT}`)
})
