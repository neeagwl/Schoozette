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
       classDescription:{
            type: String
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
        
        topics:[{
            topicName: {
                type: String,
                required: true
            },
            topicTheory :{
                type: String,
                required: true
            }
        }],
           
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