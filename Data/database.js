import mongoose from "mongoose"
const mongodb = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("CONNECTION OPEN!!!"); // Connection successful
        })
        .catch(err => {
            console.error("OH NO ERROR!!!!", err); // Connection failed
        });
}
export default mongodb;