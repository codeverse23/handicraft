import mongoose  from "mongoose";
const uri="mongodb+srv://HandicraftsUser:DBXyASauHRen2bUm@handicrafts-db.cesej.mongodb.net/?retryWrites=true&w=majority&appName=Handicrafts-db";

const dbConnect =async()=>{
    try{
      mongoose.connect(uri);
      console.log("Db connect successfully")
    }catch(error){
     console.log("ERROR:",err)
    }
};
dbConnect();
export default dbConnect;
