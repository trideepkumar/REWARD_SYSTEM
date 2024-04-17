const dev = {
    env: "dev",
    url: "mongodb+srv://trideepkumar111:trideep@123@cluster0.xp2proq.mongodb.net/REWARD_SETUP",
}

export default (config) => {
    if (config === "dev") {
        return dev;
    }
};

