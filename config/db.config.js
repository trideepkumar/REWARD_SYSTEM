const dev = {
    env : "dev",
    url : "mongodb://localhost:27017/WELSPUN_STHITHI_REWARDS_DEV",
}

module.exports = (config) => {
    if(config === "dev"){
        return dev
    }
} 