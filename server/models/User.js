const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const attemptedQuizSchema = mongoose.Schema(
    {
        quiz_id :{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Quiz"
        },
        quiz_index :{
            type: Number,
            required: true
        },
        quiz_score :{
            type: Number,
            required: true
        }
    }
)

const enrolledClassSchema = mongoose.Schema({

    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class"
    },
    totalScore:{
        type:Number,
        required: true,
        default:0
    },

    attemptedQuiz: [{type: attemptedQuizSchema, default: null}]

})

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },

        createdClass : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        }],

        enrolledClass : [enrolledClassSchema]

    },
    {
        timestamps:true
    }
)

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        this.password= await bcrypt.hash(this.password,salt)
    }else{
        next()
    }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User',userSchema);
module.exports = User