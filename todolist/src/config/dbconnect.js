const mongoose = require("mongoose");
const connectToDB = async () => {
try {
    await mongoose.connect("mongodb+srv://lakshmimudimela24:lakshmi24@cluster0.yabc9ok.mongodb.net/"); 
    console.log("Database connected ");

} catch (error) {
    console.error("ERROR in connecting!", error);
}
};
module.exports = connectToDB;