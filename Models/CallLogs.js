const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//call logs schema for calls
const CallLogsSchema = new Schema({
    CallId :{
        type:String,
        require:true,
        unique:true
    },
    CallStatus:{
        type:String,
        require:true,
    },
    CallDuration:{
        type:String,
        require:true,
    },
    CallFromNumber:{
        type:String,
        require:true,
    },
    RecordingUrlFile:{
        type:String
    }
})


module.exports = User = mongoose.model("callLogs", CallLogsSchema);