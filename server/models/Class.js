const mongoose = require('mongoose');

const classSchema = mongoose.Schema(
    {
       classCode: {
           type: String
        
       },
       className: {
           type: String,
           required: true
       },
       classTeacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
       },
       enrolledStudents : [ 
           {
               type: mongoose.Schema.Types.ObjectId ,
               ref : "User"

           } ],
           
        quizzes :[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quiz"
            }
        ]   

    },
    {
        timestamps:true
    }
)


const Class = mongoose.model('Class',classSchema);
module.exports = Class