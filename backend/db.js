const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNoteBook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongoDB = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connect to MongoDB")
    })
}

module.exports = connectToMongoDB;