const  generateQr = async(req,res)=>{
     try{
         
     }catch(err){
        console.log(err)
        res.status(500).send('Something error happened!!')
     }
}



module.exports = {
    generateQr
}