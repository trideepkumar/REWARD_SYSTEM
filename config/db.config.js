const dev = {
    env: "dev",
    // url : "mongodb://localhost:27017/WELSPUN_STHITHI_REWARDS_DEV",
    url: "mongodb+srv://trideepkumar111:trideep@123@cluster0.xp2proq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 "
}

module.exports = (config) => {
    if(config === "dev"){
        return dev
    }  
} 