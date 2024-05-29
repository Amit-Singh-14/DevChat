import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongodb connected:", conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

export default ConnectDB;
