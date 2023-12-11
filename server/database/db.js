import  mongoose  from "mongoose"


const Connection=async (username,password)=>{
const URL=`mongodb+srv://${username}:${password}@cluster0.8yc27lm.mongodb.net/?retryWrites=true&w=majority`;
    try {
    await mongoose.connect(URL);
    console.log("Database connected")
} catch (error) {
    console.log("error while connecting database",error);
}
}
export default Connection;