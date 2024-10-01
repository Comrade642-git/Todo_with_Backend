import mongoose from "mongoose"
const mongodb = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then((c) => {
            console.log(`DataBase is connected to ${c.connection.host}`); 
        })
        .catch(err => {
            console.error("OH NO ERROR!!!!", err); 
        });
}
export default mongodb;