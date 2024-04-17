const  generateQr = async(req,res)=>{
     try{
         console.log(req.body)
     }catch(err){
        console.log(err)
        res.status(500).send('Something error happened!!')
     }
}



module.exports = {
    generateQr
}