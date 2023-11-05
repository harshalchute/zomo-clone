const shortid=require('shortid');
const Razorpay=require('razorpay');
const crypto=require('crypto');
const Transactions=require('../models/transaction')



const instance=new Razorpay({
    key_id:"rzp_test_933NtIX674Z4Nz",
    key_secret:"xK0fKlv6LoYKsYjQcL1THnXu"
})

exports.saveTransaction=(req,res)=>{
    console.log("Saving Transaction!")
    const generated_signature=crypto.createHmac('sha256',instance.key_secret);
    generated_signature.update(req.body.razorpay_order_id+"|"+req.body.razorpay_payment_id)

   
    if (req.body.razorpay_signature == generated_signature.digest('hex')){
       //save transaction to collection

          console.log("Creating Transaction object")
           const transaction = new Transactions({
             transaction_id:req.body.razorpay_payment_id,
             transaction_amount:req.body.razorpay_amount
         });
         console.log(transaction)
         transaction.save(function(error, saveTransaction){
           if(error){
               console.log(error);
               return res.status(500).send("Some Problem Occured",error)
           }
           console.log("Transaction saved to db")
           res.send({transaction:transaction })
 
       });
     // return res.send('success');
   }
   else{
     return res.send('failed');
   }
 }


exports.createOrder=async(req,res)=>{
    console.log("Payment Initiated")
    const options={
        amount:req.body.amount*100,
        currency: "INR",
        receipt: shortid.generate(),
        notes: {key1: "value3",    key2: "value2"}
    }

try{
    const response=await instance.orders.create(options)
    console.log(response)
    res.json(response)
}
catch(error){
    console.log(error)
}


}

